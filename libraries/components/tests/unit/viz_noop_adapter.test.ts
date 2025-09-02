import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import { hydrateVizContainers } from "../../src/transform/viz/adapter/noop.ts"

Deno.test("noop viz adapter marks data-viz containers as hydrated", () => {
	// Create a tiny DOM-like shim
	const created: Array<{ dataset: Record<string, string> }> = []
	const scope = {
		querySelectorAll: (sel: string) => {
			if (sel !== "[data-viz]") return []
			const el1 = { dataset: {} as Record<string, string> }
			const el2 = { dataset: {} as Record<string, string> }
			created.push(el1, el2)
			return [el1, el2]
		},
	} as unknown as Document

	hydrateVizContainers(scope)
	assertEquals(created[0].dataset.vizHydrated, "true")
	assertEquals(created[1].dataset.vizHydrated, "true")
})
