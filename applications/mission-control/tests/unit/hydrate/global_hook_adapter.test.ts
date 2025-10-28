import type { VizAdapter } from "@sitebender/architect/transform/viz/adapter/types.ts"

import {
	getVizAdapter,
	setVizAdapter,
	vizNoopAdapter,
} from "@sitebender/architect/index.ts"
import { assertEquals } from "@std/assert"

type GlobalShims = {
	document?: Document
	window?: unknown
	sitebenderVizAdapter?: VizAdapter
}

Deno.test("global viz adapter hook is auto-registered and used in docs hydrate", async () => {
	// Preserve globals and registry adapter
	const g = globalThis as unknown as GlobalShims
	const prevDoc = g.document
	const prevWin = g.window
	const prevGlobalAdapter = g.sitebenderVizAdapter
	const prevRegistryAdapter = getVizAdapter()

	// Minimal fake document/window
	const els: Array<{ dataset: Record<string, string> }> = [
		{ dataset: {} },
		{ dataset: {} },
	]

	const fakeDocument = {
		readyState: "complete",
		getElementById: (_: string) => null, // skip IR hydration path
		querySelectorAll: (_: string) => els,
		addEventListener: (_: string, __: unknown) => void 0,
	} as unknown as Document
	g.document = fakeDocument
	g.window = {}

	// Provide a global hook adapter
	const globalAdapter = {
		hydrate(root?: Document | HTMLElement) {
			const scope = (root ?? document) as Document
			const nodes = scope.querySelectorAll(
				"[data-viz]",
			) as unknown as Array<
				{ dataset: Record<string, string> }
			>
			for (const n of nodes) n.dataset.vizHydrated = "global"
		},
	}
	g.sitebenderVizAdapter = globalAdapter

	// Import hydrate entry so it executes with our fake globals
	const modUrl = new URL("../../../src/hydrate/artificer.ts", import.meta.url)
	await import(modUrl.href)

	// The global adapter should have been auto-registered and executed
	for (const el of els) {
		assertEquals(el.dataset.vizHydrated, "global")
	} // Cleanup: restore globals and registry adapter

	g.document = prevDoc
	g.window = prevWin
	if (prevGlobalAdapter === undefined) delete g.sitebenderVizAdapter
	else g.sitebenderVizAdapter = prevGlobalAdapter

	if (prevRegistryAdapter) setVizAdapter(prevRegistryAdapter)
	else setVizAdapter(vizNoopAdapter)
})
