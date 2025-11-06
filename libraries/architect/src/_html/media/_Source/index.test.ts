import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Source from "./index.ts"

Deno.test("_Source component", async function sourceTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Source({})

			assert(isVirtualNode(component))
		},
	)
})
