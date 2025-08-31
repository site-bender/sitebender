import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import type {
	ActionNode,
	IrDocument,
} from "../../../adaptive/types/ir/index.ts"

import { compileToAdaptive } from "../../src/compile.ts"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import On from "../../src/transform/control/On/index.tsx"

Deno.test("golden: On with multiple actions picks the first action as handler", () => {
	const tree = [
		{ type: "button", props: { id: "go" } },
		On({
			event: "Click",
			children: [
				Publish({ topic: "first" }) as unknown as JSX.Element,
				Publish({ topic: "second" }) as unknown as JSX.Element,
			],
		}),
	]

	const doc = compileToAdaptive(tree) as IrDocument
	const evt = doc.children[0] as { id: string; handler: ActionNode }
	assertEquals(evt.id, "go")
	const handler = evt.handler
	assertEquals(handler.action, "Act.Publish")
	const topic = (handler.args?.[0] as { args?: { value?: string } })?.args
		?.value
	assertEquals(typeof topic, "string")
	// Ensure it came from the first action
	assertEquals((topic as string).includes("first"), true)
})
