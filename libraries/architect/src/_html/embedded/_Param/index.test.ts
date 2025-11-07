import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Param from "./index.ts"

Deno.test("_Param component", async function paramTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Param({})

			assert(isVirtualNode(component))
		},
	)
})
