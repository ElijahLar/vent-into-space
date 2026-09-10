import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

export type VoidHandle = {
  /** React subtly as a vent approaches the event horizon. intensity 0..1 */
  approach: (intensity: number) => void;
  /** Trigger the brief impact ripple after a vent disappears. */
  impact: () => void;
  /** Center of the void in viewport coordinates. */
  getCenter: () => { x: number; y: number; radius: number };
};

type Particle = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// The actual canvas is larger than the visible void.
// This gives the haze/glow room to fade naturally instead of being
// visibly clipped by the edge of the canvas.
const CANVAS_SCALE = 1.9;

export function Void({ ref }: { ref?: Ref<VoidHandle> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const approachRef = useRef(0);
  const impactRef = useRef(0);
  const shockRef = useRef(99);

  useImperativeHandle(ref, () => ({
    approach: (intensity) => {
      // Multiple in-flight messages can overlap; keep whichever is currently closest.
      approachRef.current = Math.max(
        approachRef.current,
        clamp01(intensity),
      );
    },

    impact: () => {
      impactRef.current = 1;
      approachRef.current = 0;
      shockRef.current = 0;
    },

    getCenter: () => {
      const el = wrapRef.current;

      if (!el) {
        return {
          x: 0,
          y: 0,
          radius: 80,
        };
      }

      const r = el.getBoundingClientRect();

      return {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        radius: Math.min(r.width, r.height) * 0.24,
      };
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;

    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const reduced = prefersReducedMotion();

    let width = 0;
    let height = 0;

    // Important:
    // visualSize represents the original visible void area.
    // width/height represent the larger canvas.
    let visualSize = 0;

    let dpr = 1;

    const resize = () => {
      const r = wrap.getBoundingClientRect();

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      visualSize = Math.min(r.width, r.height);

      width = r.width * CANVAS_SCALE;
      height = r.height * CANVAS_SCALE;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const particles: Particle[] = Array.from(
      {
        length: 44,
      },
      () => {
        const radius = 0.32 + Math.random() * 0.68;

        return {
          angle: Math.random() * Math.PI * 2,
          radius,
          speed: (0.05 + Math.random() * 0.12) / (radius * 2.2),
          size: 0.5 + Math.random() * 1.2,
          alpha: 0.12 + Math.random() * 0.35,
        };
      },
    );

    let raf = 0;
    let last = performance.now();
    let t = 0;

    const draw = (now: number) => {
      const dt = Math.min(
        0.05,
        (now - last) / 1000,
      );

      last = now;
      t += dt;

      // Approach is continuously refreshed by the message and otherwise settles quickly.
      approachRef.current = Math.max(
        0,
        approachRef.current - dt * 2.8,
      );

      impactRef.current = Math.max(
        0,
        impactRef.current - dt * 1.8,
      );

      const approach = approachRef.current;
      const impact = impactRef.current;

      // The black hole is centered inside the oversized canvas.
      const cx = width / 2;
      const cy = height / 2;

      // IMPORTANT:
      // Hole size is still based on the original visible component,
      // NOT the larger canvas.
      const base = visualSize / 2;

      const core =
        base *
        0.48 *
        (1 + approach * 0.015 + impact * 0.04);

      ctx.clearRect(
        0,
        0,
        width,
        height,
      );

      // ------------------------------------------------
      // OUTER ATMOSPHERIC HAZE
      // ------------------------------------------------

      const haze = ctx.createRadialGradient(
        cx,
        cy,
        core * 0.9,
        cx,
        cy,
        base * 1.5,
      );

      haze.addColorStop(
        0,
        `rgba(150,160,210,${
          0.1 +
          approach * 0.035 +
          impact * 0.08
        })`,
      );

      haze.addColorStop(
        0.45,
        `rgba(110,120,175,${
          0.035 +
          approach * 0.015 +
          impact * 0.035
        })`,
      );

      haze.addColorStop(
        1,
        "rgba(0,0,0,0)",
      );

      ctx.fillStyle = haze;

      ctx.fillRect(
        0,
        0,
        width,
        height,
      );

      // ------------------------------------------------
      // LENSING HALO
      // ------------------------------------------------

      const breathe = reduced
        ? 0
        : Math.sin(t * 0.6) * 0.012;

      const ringR =
        core *
        (
          1.06 +
          breathe +
          approach * 0.025 +
          impact * 0.07
        );

      const ring = ctx.createRadialGradient(
        cx,
        cy,
        ringR * 0.9,
        cx,
        cy,
        ringR * 1.35,
      );

      ring.addColorStop(
        0,
        "rgba(215,220,255,0)",
      );

      ring.addColorStop(
        0.35,
        `rgba(198,205,255,${
          0.22 +
          approach * 0.1 +
          impact * 0.24
        })`,
      );

      ring.addColorStop(
        1,
        "rgba(0,0,0,0)",
      );

      ctx.fillStyle = ring;

      ctx.beginPath();

      ctx.arc(
        cx,
        cy,
        ringR * 1.4,
        0,
        Math.PI * 2,
      );

      ctx.fill();

      // ------------------------------------------------
      // ACCRETION ARC
      // ------------------------------------------------

      ctx.save();

      ctx.translate(
        cx,
        cy,
      );

      ctx.rotate(
        -0.35 +
          (
            reduced
              ? 0
              : Math.sin(t * 0.15) * 0.05
          ),
      );

      ctx.scale(
        1,
        0.28,
      );

      ctx.beginPath();

      ctx.arc(
        0,
        0,
        core * 1.28,
        0,
        Math.PI * 2,
      );

      ctx.strokeStyle =
        `rgba(206,198,235,${
          0.16 +
          approach * 0.08 +
          impact * 0.2
        })`;

      ctx.lineWidth =
        1.2 +
        approach * 0.35 +
        impact * 1.15;

      ctx.stroke();

      ctx.restore();

      // ------------------------------------------------
      // EVENT HORIZON
      // ------------------------------------------------

      const disc = ctx.createRadialGradient(
        cx,
        cy,
        core * 0.7,
        cx,
        cy,
        core * 1.02,
      );

      disc.addColorStop(
        0,
        "rgba(0,0,0,1)",
      );

      disc.addColorStop(
        0.85,
        "rgba(0,0,0,1)",
      );

      disc.addColorStop(
        1,
        "rgba(0,0,0,0.2)",
      );

      ctx.fillStyle = disc;

      ctx.beginPath();

      ctx.arc(
        cx,
        cy,
        core * 1.02,
        0,
        Math.PI * 2,
      );

      ctx.fill();

      // ------------------------------------------------
      // IMPACT RIPPLE
      // ------------------------------------------------

      if (shockRef.current < 1.35) {
        shockRef.current += dt;

        const s =
          shockRef.current / 1.35;

        const waveR =
          core *
          (1 + s * 1.45);

        const fade =
          Math.sin(
            (1 - s) *
              Math.PI *
              0.5,
          ) *
          (1 - s);

        ctx.beginPath();

        ctx.arc(
          cx,
          cy,
          waveR,
          0,
          Math.PI * 2,
        );

        ctx.strokeStyle =
          `rgba(206,212,255,${
            0.14 * fade
          })`;

        ctx.lineWidth =
          1 + fade;

        ctx.stroke();
      }

      // ------------------------------------------------
      // PARTICLES
      // ------------------------------------------------

      const shock =
        shockRef.current < 1.35
          ? shockRef.current / 1.35
          : 1;

      const waveFront =
        core *
        (1 + shock * 1.45);

      for (const particle of particles) {
        if (!reduced) {
          particle.angle +=
            particle.speed *
            dt *
            (
              1 +
              approach * 0.5 +
              impact * 0.8
            );
        }

        let r =
          core *
          (
            1.25 +
            particle.radius * 1.5
          ) *
          (
            1 -
            approach * 0.035 -
            impact * 0.025
          );

        if (shock < 1) {
          const d =
            Math.abs(
              r - waveFront,
            ) /
            (core * 0.55);

          const push =
            Math.exp(
              -d * d * 3,
            ) *
            (1 - shock) *
            core *
            0.085;

          r += push;
        }

        const x =
          cx +
          Math.cos(
            particle.angle,
          ) *
            r;

        const y =
          cy +
          Math.sin(
            particle.angle,
          ) *
            r *
            0.55;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          particle.size,
          0,
          Math.PI * 2,
        );

        ctx.fillStyle =
          `rgba(226,229,255,${
            particle.alpha *
            (
              0.7 +
              approach * 0.22 +
              impact * 0.45
            )
          })`;

        ctx.fill();
      }

      raf =
        requestAnimationFrame(
          draw,
        );
    };

    raf =
      requestAnimationFrame(
        draw,
      );

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative mx-auto aspect-square w-[min(78vw,20rem)] overflow-visible"
    >
      <canvas
        ref={canvasRef}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
      />
    </div>
  );
}