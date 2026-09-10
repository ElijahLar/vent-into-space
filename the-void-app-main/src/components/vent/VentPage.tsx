import { useCallback, useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Void, type VoidHandle } from "./Void";
import { VentInput } from "./VentInput";
import { VentMessageAnimation, type FlyingVent } from "./VentMessageAnimation";
import { SettingsSheet } from "./SettingsSheet";

export function VentPage() {
  const [draft, setDraft] = useState("");
  const [flying, setFlying] = useState<FlyingVent[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const voidRef = useRef<VoidHandle>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Clear ephemeral text when leaving the page. If the browser restores this page
    // from its back/forward cache, clear it again before the user can continue.
    const clearEphemeralText = () => {
      setDraft("");
      setFlying([]);
      if (inputRef.current) inputRef.current.value = "";
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) clearEphemeralText();
    };

    window.addEventListener("pagehide", clearEphemeralText);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pagehide", clearEphemeralText);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const send = useCallback(() => {
    const text = draft.trim();
    const wrap = inputWrapRef.current;
    const target = voidRef.current?.getCenter();
    if (!text || !wrap || !target) return;

    setFlying((prev) => [
      ...prev,
      { id: nextId.current++, text, origin: wrap.getBoundingClientRect(), target },
    ]);
    setDraft("");
    inputRef.current?.focus();

    try {
      navigator.vibrate?.(8);
    } catch {
      /* vibration unsupported */
    }
  }, [draft]);

  const handleProgress = useCallback((p: number) => {
    // Feed proximity into the void without stacking a new pulse on every animation frame.
    const proximity = Math.max(0, Math.min(1, (p - 0.68) / 0.3));
    if (proximity > 0) voidRef.current?.approach(proximity);
  }, []);

  const handleDone = useCallback((id: number) => {
    // The vent text is dropped from state here and never persisted.
    setFlying((prev) => prev.filter((v) => v.id !== id));
    voidRef.current?.impact();
    try {
      navigator.vibrate?.(14);
    } catch {
      /* vibration unsupported */
    }
  }, []);

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,color-mix(in_oklab,var(--halo)_10%,transparent),transparent_62%)]"
      />

      <div className="app-enter relative flex w-full max-w-md flex-1 flex-col">
        <header className="flex items-center justify-between pt-6">
          <h1 className="text-sm font-medium tracking-[0.42em] text-foreground/90">VENT</h1>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label="About and settings"
            className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            <MoreHorizontal className="size-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex flex-1 items-center justify-center py-6">
          <Void ref={voidRef} />
        </div>

        <div ref={inputWrapRef} className="w-full pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <VentInput
            value={draft}
            onChange={setDraft}
            onSend={send}
            textareaRef={inputRef}
            disabled={false}
          />
          <p className="mt-3 text-center text-[11px] tracking-wide text-muted-foreground/60">
            Say it. Send it. Gone.
          </p>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {flying.length > 0 ? "Sent into the void." : ""}
      </div>

      {flying.map((vent) => (
        <VentMessageAnimation
          key={vent.id}
          vent={vent}
          reducedMotion={reducedMotion}
          onProgress={handleProgress}
          onDone={handleDone}
        />
      ))}

      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </main>
  );
}
