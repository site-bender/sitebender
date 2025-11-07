import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Base from "./index.ts"

Deno.test("_Base component", async function baseTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Base({})

			assert(isVirtualNode(component))
		},
	)
})
