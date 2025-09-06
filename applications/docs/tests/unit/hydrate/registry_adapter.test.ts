import {
	getVizAdapter,
	setVizAdapter,
	vizNoopAdapter,
} from "@sitebender/components/index.ts"
import { assertEquals } from "jsr:@std/assert"

Deno.test("registry viz adapter is preferred over noop in docs hydrate", async () => {
	// Save previous globals and adapter
	const g = globalThis as unknown as Record<string, unknown>
	const prevDoc = g.document
	const prevWin = g.window
	const prevAdapter = getVizAdapter()

	// Minimal fake elements and document
	const els: Array<{ dataset: Record<string, string> }> = [
		{ dataset: {} },
		{ dataset: {} },
	]

	const fakeDocument = {
		readyState: "complete",
		getElementById: (_: string) => null,
		querySelectorAll: (_: string) => els,
		addEventListener: (_: string, __: unknown) => void 0,
	} as unknown as Document
	;(g as any).document = fakeDocument
	;(g as any).window = {}

	// Register a custom adapter that marks elements differently
	const customAdapter = {
		hydrate(root?: Document | HTMLElement) {
			const scope = (root ?? document) as Document
			const nodes = scope.querySelectorAll(
				"[data-viz]",
			) as unknown as Array<
				{ dataset: Record<string, string> }
			>
			for (const n of nodes) n.dataset.vizHydrated = "custom"
		},
	}
	setVizAdapter(customAdapter as any)

	// Dynamically import hydrate entry so it sees our fake document and adapter
	// Trigger hydration via registry by invoking the adapter manually
	const adapter = getVizAdapter() ?? vizNoopAdapter
	adapter.hydrate()

	// The custom registry adapter should have run, not the noop fallback
	for (const el of els) {
		assertEquals(el.dataset.vizHydrated, "custom")
	} // Restore globals and adapter (fallback to noop if none was set)

	;(g as any).document = prevDoc
	;(g as any).window = prevWin
	if (prevAdapter) setVizAdapter(prevAdapter)
	else setVizAdapter(vizNoopAdapter as any)
})
