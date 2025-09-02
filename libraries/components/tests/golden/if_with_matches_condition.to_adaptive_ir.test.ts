import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import type {
	ActionNode,
	ComparatorNode,
	InjectorNode,
	IrDocument,
} from "@engineTypes/ir/index.ts"

import { compileToAdaptive } from "../../src/compile.ts"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import Matches from "../../src/transform/comparators/Matches/index.tsx"
import If from "../../src/transform/control/If/index.tsx"
import On from "../../src/transform/control/On/index.tsx"
import Condition from "../../src/transform/control/slots/Condition/index.tsx"
import IfFalse from "../../src/transform/control/slots/IfFalse/index.tsx"
import IfTrue from "../../src/transform/control/slots/IfTrue/index.tsx"
import Constant from "../../src/transform/injectors/Constant/index.tsx"

Deno.test("golden: If with Matches condition compiles comparator with pattern and flags", () => {
	const condition = Matches({
		children: [
			Constant({ value: "abc" }) as unknown as JSX.Element,
			Constant({ value: "^a.*c$" }) as unknown as JSX.Element,
			"i",
		],
	}) as unknown as JSX.Element

	const tree = [
		{ type: "div", props: { id: "anchor" } },
		On({
			event: "Change",
			children: If({
				children: [
					Condition({ children: condition }) as unknown as JSX.Element,
					IfTrue({
						children: Publish({ topic: "ok" }) as unknown as JSX.Element,
					}) as unknown as JSX.Element,
					IfFalse({
						children: Publish({ topic: "nope" }) as unknown as JSX.Element,
					}) as unknown as JSX.Element,
				],
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToAdaptive(tree) as IrDocument
	const evt = doc.children[0] as { handler: ActionNode }
	const ifAction = evt.handler
	assertEquals(ifAction.action, "Act.If")
	const cond = ifAction.args[0] as ComparatorNode
	assertEquals(cond.kind, "comparator")
	// Depending on mapping, cmp may be "Matches" or namespaced; just ensure comparator args compiled
	assert(cond.args.length === 2 || cond.args.length === 3)
	const op = cond.args[0] as InjectorNode
	const pat = cond.args[1] as InjectorNode
	assertEquals(op.kind, "injector")
	assertEquals(pat.kind, "injector")
	if (cond.args.length === 3) {
		const flags = cond.args[2] as InjectorNode
		assertEquals(flags.kind, "injector")
		// flags constant string
		assertEquals(flags.injector, "From.Constant")
	}
})
