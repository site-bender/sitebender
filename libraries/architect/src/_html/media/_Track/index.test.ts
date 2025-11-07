import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Track from "./index.ts"

Deno.test("_Track component", async function trackTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Track({})

			assert(isVirtualNode(component))
		},
	)
})
