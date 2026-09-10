import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MoreApps } from "./MoreApps";
import { PrivacyInfo } from "./PrivacyInfo";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SettingsSheet({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto max-h-[88svh] max-w-lg overflow-y-auto rounded-t-3xl border-border bg-popover"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-base font-medium tracking-[0.3em] text-foreground">
            VENT
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8 px-4 pb-10">
          <section aria-labelledby="about-heading" className="space-y-2">
            <h3 id="about-heading" className="text-sm font-medium tracking-wide text-foreground">
              About Vent
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Some things don&apos;t need to be saved, analyzed, or solved. Sometimes you just need
              somewhere to put them.
            </p>
          </section>

          <PrivacyInfo />
          <MoreApps />

          <section aria-labelledby="support-heading" className="space-y-3">
            <h3 id="support-heading" className="text-sm font-medium tracking-wide text-foreground">
              Support
            </h3>
            <a
              href="https://buymeacoffee.com/elijahl"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <span aria-hidden="true">☕</span> Buy me a coffee
            </a>
            <p className="text-xs text-muted-foreground/70">Entirely optional.</p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
