// Contract for visualization adapters used by the mission-control/app hydration.
// An adapter exposes a hydrate function to (optionally) hydrate charts under a root.
export type VizAdapter = {
	// Allow sync or async hydration; root is optional for SSR-safe usage
	hydrate: (
		root?: globalThis.Document | globalThis.HTMLElement,
	) => void | Promise<void>
}
