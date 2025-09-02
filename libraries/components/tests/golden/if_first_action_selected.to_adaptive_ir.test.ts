import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import type {
	ActionNode,
	IrDocument,
} from "@engineTypes/ir/index.ts"

import { compileToEngine } from "../../src/compile.ts"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import IsEqualTo from "../../src/transform/comparators/IsEqualTo/index.tsx"
import If from "../../src/transform/control/If/index.tsx"
import On from "../../src/transform/control/On/index.tsx"
import Condition from "../../src/transform/control/slots/Condition/index.tsx"
import IfFalse from "../../src/transform/control/slots/IfFalse/index.tsx"
import IfTrue from "../../src/transform/control/slots/IfTrue/index.tsx"
import Constant from "../../src/transform/injectors/Constant/index.tsx"

Deno.test("golden: Act.If selects the first action in each branch", () => {
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
					// Multiple actions provided; compiler should pick the first in each branch
					IfTrue({
						children: [
							Publish({ topic: "first-then" }) as unknown as JSX.Element,
							Publish({ topic: "second-then" }) as unknown as JSX.Element,
						],
					}) as unknown as JSX.Element,
					IfFalse({
						children: [
							Publish({ topic: "first-else" }) as unknown as JSX.Element,
							Publish({ topic: "second-else" }) as unknown as JSX.Element,
						],
					}) as unknown as JSX.Element,
				],
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToEngine(tree) as IrDocument
	assertEquals(doc.kind, "element")
	const evt = doc.children[0] as { handler: ActionNode }
	const handler = evt.handler
	assertEquals(handler.action, "Act.If")
	assertEquals(handler.args.length, 3)
	const thenA = handler.args[1] as ActionNode
	const elseA = handler.args[2] as ActionNode
	assertEquals(thenA.action, "Act.Publish")
	assertEquals(elseA.action, "Act.Publish")
	// Verify payload topics came from the first actions only
	const thenPayload = (thenA.args?.[0] as { args?: { value?: string } })?.args
		?.value
	const elsePayload = (elseA.args?.[0] as { args?: { value?: string } })?.args
		?.value
	assert(thenPayload?.includes("first-then"))
	assert(elsePayload?.includes("first-else"))
})
