import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Col from "./index.ts"

Deno.test("_Col component", async function colTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Col({})

			assert(isVirtualNode(component))
		},
	)
})
