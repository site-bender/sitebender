import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Br from "./index.ts"

Deno.test("_Br component", async function brTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Br({})

			assert(isVirtualNode(component))
		},
	)
})
