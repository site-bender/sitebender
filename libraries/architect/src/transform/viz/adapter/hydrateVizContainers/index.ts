//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function hydrateVizContainers(root?: Document | HTMLElement) {
	// Environment guard for SSR
	if (typeof document === "undefined" && !root) return
	// deno-lint-ignore no-explicit-any
	const scope: any = root || document
	if (!scope || typeof scope.querySelectorAll !== "function") return
	try {
		const nodes = scope.querySelectorAll("[data-viz]") as unknown as Array<
			HTMLElement
		>
		for (const el of nodes as unknown as Iterable<HTMLElement>) {
			try {
				;(el as HTMLElement).dataset.vizHydrated = "true"
			} catch {
				// ignore dataset issues in non-browser test environments
			}
		}
	} catch {
		// ignore
	}
}
