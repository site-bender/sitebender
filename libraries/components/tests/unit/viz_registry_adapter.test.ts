import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import { getVizAdapter, setVizAdapter, vizNoopAdapter } from "../../src/index.ts"

Deno.test("viz adapter registry set/get works and noop exports hydrate function", () => {
	assert(typeof vizNoopAdapter.hydrateVizContainers === "function")
	setVizAdapter({ hydrate: () => {} })
	const a = getVizAdapter()
	assert(a)
	assertEquals(typeof a!.hydrate, "function")
})
