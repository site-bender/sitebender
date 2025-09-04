import type {
	ActionNode,
	ComparatorNode,
	IrDocument,
} from "@sitebender/engine-types/ir/index.ts"

import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import { compileToEngine } from "../../src/compile.ts"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import IsEqualTo from "../../src/transform/comparators/IsEqualTo/index.tsx"
import If from "../../src/transform/control/If/index.tsx"
// Controls and building blocks
import On from "../../src/transform/control/On/index.tsx"
import Condition from "../../src/transform/control/slots/Condition/index.tsx"
import IfFalse from "../../src/transform/control/slots/IfFalse/index.tsx"
import IfTrue from "../../src/transform/control/slots/IfTrue/index.tsx"
import Constant from "../../src/transform/injectors/Constant/index.tsx"

const el = (
	tag: string,
	props: Record<string, unknown> = {},
	children?: unknown,
) => ({
	type: tag,
	props: children === undefined ? props : { ...props, children },
})

Deno.test("golden: Conditional compiles to Act.If with condition + then/else actions", () => {
	const tree = [
		el("input", { id: "a" }),
		On({
			event: "Change",
			children: If({
				children: [
					Condition({
						children: IsEqualTo({
							type: "String",
							children: [
								Constant({ value: "foo" }) as unknown as JSX.Element,
								Constant({ value: "foo" }) as unknown as JSX.Element,
							],
						}) as unknown as JSX.Element,
					}) as unknown as JSX.Element,
					IfTrue({
						children: Publish({ topic: "then" }) as unknown as JSX.Element,
					}) as unknown as JSX.Element,
					IfFalse({
						children: Publish({ topic: "else" }) as unknown as JSX.Element,
					}) as unknown as JSX.Element,
				],
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToEngine(tree) as IrDocument
	assertEquals(doc.kind, "element")
	assert(Array.isArray(doc.children))
	const evt = doc.children[0] as { handler: ActionNode }
	const handler = evt.handler
	assertEquals(handler.kind, "action")
	assertEquals(handler.action, "Act.If")
	// Expect three args: condition comparator, then action, else action
	assertEquals(handler.args.length, 3)
	const cond = handler.args[0] as ComparatorNode
	assertEquals(cond.kind, "comparator")
	// Allow either namespaced or un-namespaced depending on mapping
	assert(cond.cmp === "Is.EqualTo" || cond.cmp === "EqualTo")
	const thenA = handler.args[1] as ActionNode
	const elseA = handler.args[2] as ActionNode
	assertEquals(thenA.kind, "action")
	assertEquals(elseA.kind, "action")
	assertEquals(thenA.action, "Act.Publish")
	assertEquals(elseA.action, "Act.Publish")
})
