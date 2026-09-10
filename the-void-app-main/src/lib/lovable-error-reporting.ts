/**
 * Intentionally disabled for Vent.
 *
 * Vent's core privacy promise is that typed content is not uploaded by the app.
 * Keep this helper as a no-op so an accidental future import cannot forward a
 * runtime error (or any context attached to it) to Lovable client telemetry.
 */
export function reportLovableError(_error: unknown, _context: Record<string, unknown> = {}) {
  // no-op by design
}
