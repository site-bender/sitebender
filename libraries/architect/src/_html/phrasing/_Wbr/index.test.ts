import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Wbr from "./index.ts"

Deno.test("_Wbr component", async function wbrTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Wbr({})

			assert(isVirtualNode(component))
		},
	)
})
