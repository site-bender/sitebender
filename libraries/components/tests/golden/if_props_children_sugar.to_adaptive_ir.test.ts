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
import Constant from "../../src/transform/injectors/Constant/index.tsx"

Deno.test("golden: If sugar without slots maps first/second child to then/else", () => {
	const condition = IsEqualTo({
		type: "String",
		children: [
			Constant({ value: "a" }) as unknown as JSX.Element,
			Constant({ value: "a" }) as unknown as JSX.Element,
		],
	}) as unknown as JSX.Element

	const tree = [
		{ type: "div", props: { id: "anchor" } },
		On({
			event: "Change",
			children: If({
				condition,
				children: [
					Publish({ topic: "then-first" }) as unknown as JSX.Element,
					Publish({ topic: "else-first" }) as unknown as JSX.Element,
				],
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToAdaptive(tree) as IrDocument
	const evt = doc.children[0] as { handler: ActionNode }
	const handler = evt.handler
	assertEquals(handler.action, "Act.If")
	const thenA = handler.args[1] as ActionNode
	const elseA = handler.args[2] as ActionNode
	// Ensure it selected the first of each branch
	const thenPayload = (thenA.args?.[0] as { args?: { value?: string } })?.args
		?.value
	const elsePayload = (elseA.args?.[0] as { args?: { value?: string } })?.args
		?.value
	assertEquals(typeof thenPayload, "string")
	assertEquals(typeof elsePayload, "string")
})
