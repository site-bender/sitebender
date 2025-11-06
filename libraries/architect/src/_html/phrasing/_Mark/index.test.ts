import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"
import _P from "@sitebender/architect/_html/flow/_P/index.ts"

import _Mark from "./index.ts"

Deno.test("_Mark component", async function markTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Mark({})

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"handles children",
		function handlesChildren() {
			const text = { _tag: "text" as const, content: "test content" }
			const paragraph = _P({ children: [text] })
			const component = _Mark({ children: [paragraph] })

			assert(isVirtualNode(component))
		},
	)
})
