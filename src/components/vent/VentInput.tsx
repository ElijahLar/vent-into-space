import { ArrowUp } from "lucide-react";
import { useEffect, useRef, type Ref } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  textareaRef: Ref<HTMLTextAreaElement>;
  disabled?: boolean;
};

export function VentInput({ value, onChange, onSend, textareaRef, disabled }: Props) {
  const innerRef = useRef<HTMLTextAreaElement | null>(null);

  // Grow with content, up to a comfortable mobile-friendly maximum.
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      autoComplete="off"
      className="flex w-full items-end gap-2 rounded-2xl border border-border bg-card/70 px-3 py-2.5 backdrop-blur-sm transition-colors focus-within:border-ring/60"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSend) onSend();
      }}
    >
      <label htmlFor="vent-input" className="sr-only">
        Write what you need to get out
      </label>
      <textarea
        id="vent-input"
        ref={(node) => {
          innerRef.current = node;
          if (typeof textareaRef === "function") textareaRef(node);
          else if (textareaRef)
            (textareaRef as { current: HTMLTextAreaElement | null }).current = node;
        }}
        rows={1}
        suppressHydrationWarning
        value={value}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="send"
        data-1p-ignore="true"
        data-lpignore="true"
        placeholder="Say whatever you need to say."
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return;
          e.preventDefault();
          if (canSend) onSend();
        }}
        className="max-h-[200px] min-h-[2.5rem] flex-1 resize-none bg-transparent py-1.5 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Send into the void"
        disabled={!canSend}
        className="mb-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-accent active:scale-95 disabled:opacity-35"
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </button>
    </form>
  );
}
