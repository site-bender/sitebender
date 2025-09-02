import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import type {
	ActionNode,
	IrDocument,
} from "@engineTypes/ir/index.ts"

import { compileToAdaptive } from "../../src/compile.ts"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import IsEqualTo from "../../src/transform/comparators/IsEqualTo/index.tsx"
import If from "../../src/transform/control/If/index.tsx"
import On from "../../src/transform/control/On/index.tsx"
import Condition from "../../src/transform/control/slots/Condition/index.tsx"
import IfFalse from "../../src/transform/control/slots/IfFalse/index.tsx"
import IfTrue from "../../src/transform/control/slots/IfTrue/index.tsx"
import Constant from "../../src/transform/injectors/Constant/index.tsx"

Deno.test("golden: nested If can appear as a branch executable in Act.If", () => {
	const innerThen = Publish({ topic: "inner-then" }) as unknown as JSX.Element
	const innerElse = Publish({ topic: "inner-else" }) as unknown as JSX.Element

	const innerIf = If({
		children: [
			Condition({
				children: IsEqualTo({
					type: "String",
					children: [
						Constant({ value: "y" }) as unknown as JSX.Element,
						Constant({ value: "y" }) as unknown as JSX.Element,
					],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
			IfTrue({ children: innerThen }) as unknown as JSX.Element,
			IfFalse({ children: innerElse }) as unknown as JSX.Element,
		],
	}) as unknown as JSX.Element

	const tree = [
		{ type: "div", props: { id: "anchor" } },
		On({
			event: "Change",
			children: If({
				children: [
					Condition({
						children: IsEqualTo({
							type: "String",
							children: [
								Constant({ value: "x" }) as unknown as JSX.Element,
								Constant({ value: "x" }) as unknown as JSX.Element,
							],
						}) as unknown as JSX.Element,
					}) as unknown as JSX.Element,
					IfTrue({ children: innerIf }) as unknown as JSX.Element,
					IfFalse({
						children: Publish({
							topic: "outer-else",
						}) as unknown as JSX.Element,
					}) as unknown as JSX.Element,
				],
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToAdaptive(tree) as IrDocument
	assertEquals(doc.kind, "element")
	const evt = doc.children[0] as { handler: ActionNode }
	const handler = evt.handler
	assertEquals(handler.action, "Act.If")
	// Three arguments: condition, then-exec (nested If), else-exec (action)
	assertEquals(handler.args.length, 3)
	const thenExec = handler.args[1] as ActionNode
	const elseExec = handler.args[2] as ActionNode
	assertEquals(thenExec.action, "Act.If")
	assertEquals(elseExec.action, "Act.Publish")
})
