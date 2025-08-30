/**
 * No-op Viz renderer adapter
 *
 * Finds elements with data-viz attributes and marks them hydrated.
 * This is a placeholder for a real chart renderer.
 */

export function hydrateVizContainers(root?: Document | HTMLElement) {
  // Environment guard for SSR
  if (typeof document === "undefined" && !root) return
  // deno-lint-ignore no-explicit-any
  const scope: any = root || document
  if (!scope || typeof scope.querySelectorAll !== "function") return
  try {
    const nodes = scope.querySelectorAll('[data-viz]') as unknown as Array<HTMLElement>
    // If the environment returns a NodeList, it should still be iterable
    for (const el of nodes as unknown as Iterable<HTMLElement>) {
      // Mark as hydrated; real adapters would render charts here
      try {
        (el as HTMLElement).dataset.vizHydrated = "true"
      } catch {
        // ignore dataset issues in non-browser test environments
      }
    }
  } catch {
    // ignore
  }
}

export default { hydrateVizContainers }
