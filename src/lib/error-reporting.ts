// Generic client-side error reporter to capture uncaught projector/renderer errors.
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  console.error("Projector Error Boundary Captured:", error, context);
}
