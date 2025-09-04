import type {
	ActionNode,
	InjectorNode,
	IrDocument,
} from "@sitebender/engine-types/ir/index.ts"

import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import { compileToEngine } from "../../src/compile.ts"
import SetValue from "../../src/transform/actions/SetValue/index.tsx"
import On from "../../src/transform/control/On/index.tsx"
import FromElement from "../../src/transform/injectors/FromElement/index.tsx"

Deno.test("golden: On uses anchor inference from action args when no prior element and no explicit target", () => {
	const tree = [
		// No prior element anchor here on purpose
		On({
			event: "Change",
			children: SetValue({
				selector: "#out",
				value: FromElement({ id: "source" }) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToEngine(tree) as IrDocument
	assertEquals(doc.kind, "element")
	assert(Array.isArray(doc.children))
	const evt = doc.children[0] as {
		id: string
		event: string
		handler: ActionNode
	}
	// Inferred anchor should be the From.Element id (without '#')
	assertEquals(evt.id, "source")
	assertEquals(evt.event, "On.Change")
	const handler = evt.handler as ActionNode
	assertEquals(handler.action, "Act.SetValue")
})

Deno.test("golden: On.target overrides anchor inference from action args", () => {
	const tree = [
		On({
			event: "Input",
			target: "override",
			children: SetValue({
				selector: "#out",
				value: FromElement({ id: "source" }) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as { id: string; handler: ActionNode }
	// Even though value references #source, explicit target wins
	assertEquals(evt.id, "override")
	const handler = evt.handler
	assertEquals(handler.action, "Act.SetValue")
	const [sel, val] = handler.args as [InjectorNode, InjectorNode]
	assertEquals(sel.injector, "From.Constant")
	assertEquals(val.injector, "From.Element")
})
