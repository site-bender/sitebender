import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Embed from "./index.ts"

Deno.test("_Embed component", async function embedTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Embed({})

			assert(isVirtualNode(component))
		},
	)
})
