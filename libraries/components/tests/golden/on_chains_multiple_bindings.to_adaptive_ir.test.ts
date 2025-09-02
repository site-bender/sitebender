import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import type {
	EventBindingNode,
	IrDocument,
} from "@engineTypes/ir/index.ts"

import { compileToEngine } from "../../src/compile.ts"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import On from "../../src/transform/control/On/index.tsx"

Deno.test("golden: multiple On markers create multiple event bindings (chains)", () => {
	const tree = [
		{ type: "input", props: { id: "a" } },
		On({
			event: "Input",
			children: Publish({ topic: "first" }) as unknown as JSX.Element,
		}),
		On({
			event: "Change",
			children: Publish({ topic: "second" }) as unknown as JSX.Element,
		}),
		{ type: "input", props: { id: "b" } },
		On({
			event: "Input",
			children: Publish({ topic: "third" }) as unknown as JSX.Element,
		}),
	]

	const doc = compileToEngine(tree) as IrDocument
	const events = doc.children as EventBindingNode[]
	assertEquals(events.length, 3)
	assertEquals(events[0].id, "a")
	assertEquals(events[0].event, "On.Input")
	assertEquals(events[1].id, "a")
	assertEquals(events[1].event, "On.Change")
	assertEquals(events[2].id, "b")
	assertEquals(events[2].event, "On.Input")
})
