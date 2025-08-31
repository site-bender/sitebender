import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import NotEmpty from "../../src/transform/comparators/NotEmpty/index.tsx"
import compile from "../../src/transform/compile/minimal.ts"
import Validation from "../../src/transform/control/Validation/index.tsx"
import FromElement from "../../src/transform/injectors/FromElement/index.tsx"

const el = (
	tag: string,
	props: Record<string, unknown> = {},
	children?: unknown,
) => ({
	type: tag,
	props: children === undefined ? props : { ...props, children },
})

Deno.test("golden: Validation attaches to prior element in minimal compiler", () => {
	const tree = [
		el("input", { id: "email" }),
		Validation({
			when: "input",
			children: NotEmpty({
				children: FromElement({ id: "email" }) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]

	const ir = compile(tree)
	assert(Array.isArray(ir))
	assertEquals(ir.length, 1)
	const node = ir[0]
	assertEquals(node.kind, "element")
	// Narrow to element node for TypeScript
	const elNode = node as { kind: "element"; behaviors?: unknown[] }
	assert(Array.isArray(elNode.behaviors))
	const v = (elNode.behaviors || [])[0] as {
		kind?: string
		when?: string
		rule?: unknown
	}
	assertEquals(v.kind, "validation")
	assertEquals(v.when, "input")
	// Rule is passed through in minimal compiler (marker payload)
	assert(v.rule !== undefined)
})
