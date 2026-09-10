import { ExternalLink } from "lucide-react";

const APPS = [
  { name: "RepQuest - coming soon", description: "Strength training, turned into a quest.", href: "#" },
  { name: "DentCalm - coming soon", description: "A calmer way through dental anxiety.", href: "#" },
  { name: "Live Earth / Disaster Map - coming soon", description: "Live global events, one map.", href: "#" },
];

export function MoreApps() {
  return (
    <section aria-labelledby="more-apps-heading" className="space-y-3">
      <h3 id="more-apps-heading" className="text-sm font-medium tracking-wide text-foreground">
        More apps by Elijah
      </h3>
      <ul className="space-y-2">
        {APPS.map((app) => (
          <li
            key={app.name}
            className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3"
          >
            <div
              aria-hidden="true"
              className="size-10 shrink-0 rounded-lg border border-border bg-secondary"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{app.name}</p>
              <p className="truncate text-xs text-muted-foreground">{app.description}</p>
            </div>
            <a
              href={app.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${app.name}`}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
