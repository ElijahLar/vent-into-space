export function PrivacyInfo() {
  return (
    <section aria-labelledby="privacy-heading" className="space-y-2">
      <h3 id="privacy-heading" className="text-sm font-medium tracking-wide text-foreground">
        Privacy
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Vent is designed so your words stay in the page, not in a journal or database. After a vent
        disappears, Vent drops the text from its runtime state.
      </p>
      <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        <li>No account or sign-in.</li>
        <li>No vent history or vent database.</li>
        <li>Vent does not upload or persist what you type.</li>
        <li>Drafts and in-flight vents exist only temporarily in browser memory.</li>
      </ul>
      <p className="text-xs leading-relaxed text-muted-foreground/70">
        Your browser, keyboard, operating system, and extensions may have their own privacy features
        outside Vent&apos;s control.
      </p>
    </section>
  );
}
