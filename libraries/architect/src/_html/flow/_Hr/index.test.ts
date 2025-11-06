import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Hr from "./index.ts"

Deno.test("_Hr component", async function hrTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Hr({})

			assert(isVirtualNode(component))
		},
	)
})
