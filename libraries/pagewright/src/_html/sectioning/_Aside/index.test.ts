import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"
import _P from "@sitebender/pagewright/_html/flow/_P/index.ts"

import _Aside from "./index.ts"

Deno.test("_Aside component", async function asideTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Aside({})

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"handles children",
		function handlesChildren() {
			const text = { _tag: "text" as const, content: "test content" }
			const paragraph = _P({ children: [text] })
			const component = _Aside({ children: [paragraph] })

			assert(isVirtualNode(component))
		},
	)
})
