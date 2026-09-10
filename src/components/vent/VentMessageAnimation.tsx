import { useEffect, useRef } from "react";

export type FlyingVent = {
  id: number;
  text: string;
  origin: DOMRect;
  target: { x: number; y: number; radius: number };
};

type Props = {
  vent: FlyingVent;
  reducedMotion: boolean;
  onProgress?: (progress: number) => void;
  onDone: (id: number) => void;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number) => {
  const p = clamp01(value);
  return p * p * (3 - 2 * p);
};

/**
 * Renders one in-flight message and animates it into the void.
 * The text lives only in this component's props while animating.
 */
export function VentMessageAnimation({ vent, reducedMotion, onProgress, onDone }: Props) {
  const elRef = useRef<HTMLParagraphElement | null>(null);
  const progressRef = useRef(onProgress);
  progressRef.current = onProgress;

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const duration = reducedMotion ? 420 : 1480;
    const start = performance.now();
    const { origin, target } = vent;
    const startX = origin.left + origin.width / 2;
    const startY = origin.top + origin.height / 2;
    const dx = target.x - startX;
    const dy = target.y - startY;
    const distance = Math.hypot(dx, dy) || 1;
    const normalX = -dy / distance;
    const normalY = dx / distance;
    // A tiny off-axis capture path: broad early, collapsing into the singularity late.
    const captureDirection = dx >= 0 ? -1 : 1;
    const captureAmount = Math.min(28, Math.max(14, distance * 0.055)) * captureDirection;
    let raf = 0;

    const step = (now: number) => {
      const p = clamp01((now - start) / duration);
      progressRef.current?.(p);

      if (reducedMotion) {
        el.style.opacity = String(1 - p);
        el.style.transform = `scale(${1 - p * 0.35})`;
      } else {
        // Calm release, then an increasingly strong fall as the text nears the horizon.
        const travel = 0.08 * p + 0.92 * Math.pow(p, 3.35);
        const capture = Math.sin(Math.PI * p) * Math.pow(1 - p, 0.35);
        const x = startX + dx * travel + normalX * captureAmount * capture;
        const y = startY + dy * travel + normalY * captureAmount * capture;

        // Tidal deformation only becomes noticeable close to the event horizon.
        const horizon = smoothstep((p - 0.72) / 0.28);
        const stretchX = 1 + horizon * 0.18;
        const squeezeY = 1 - horizon * 0.12;
        const baseScale = 1 - 0.91 * Math.pow(p, 2.5);
        const collapse = p > 0.925 ? 1 - smoothstep((p - 0.925) / 0.055) * 0.9 : 1;
        const rotate = p * 8 * captureDirection * -1;

        // Keep the final disappearance visually crisp; blur is only a trace of lensing.
        const blur = p > 0.9 ? Math.min(0.65, (p - 0.9) * 7) : 0;

        el.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${rotate}deg) scale(${baseScale * stretchX * collapse}, ${baseScale * squeezeY * collapse})`;
        el.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
        el.style.opacity = p < 0.985 ? "1" : "0";
      }

      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        onDone(vent.id);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // vent.id uniquely identifies this animation instance; callback refs stay current separately.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vent.id]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-30 will-change-transform"
      style={{
        left: vent.origin.left + vent.origin.width / 2,
        top: vent.origin.top + vent.origin.height / 2,
        width: vent.origin.width,
        transform: "translate(-50%,-50%)",
      }}
    >
      <p
        ref={elRef}
        className="mx-auto max-h-[40vh] overflow-hidden text-center text-base leading-relaxed break-words text-foreground/90 will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        {vent.text}
      </p>
    </div>
  );
}
