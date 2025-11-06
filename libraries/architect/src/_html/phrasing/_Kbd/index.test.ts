import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"
import _P from "@sitebender/architect/_html/flow/_P/index.ts"

import _Kbd from "./index.ts"

Deno.test("_Kbd component", async function kbdTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Kbd({})

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"handles children",
		function handlesChildren() {
			const text = { _tag: "text" as const, content: "test content" }
			const paragraph = _P({ children: [text] })
			const component = _Kbd({ children: [paragraph] })

			assert(isVirtualNode(component))
		},
	)
})
