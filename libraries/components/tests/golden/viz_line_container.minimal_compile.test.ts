import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import compile from "../../src/transform/compile/minimal.ts"
import { VizLine } from "../../src/transform/index.ts"

const el = (
	tag: string,
	props: Record<string, unknown> = {},
	children?: unknown,
) => ({
	type: tag,
	props: children === undefined ? props : { ...props, children },
})

Deno.test("golden: Viz.Line emits SSR-safe container via minimal compiler", () => {
	const tree = [
		el("section", { id: "charts" }),
		VizLine({
			id: "sales",
			x: "date",
			y: "value",
		}) as unknown as JSX.Element,
	]

	const ir = compile(tree)
	assert(Array.isArray(ir))
	assertEquals(ir.length, 2)

	const node = ir[1] as {
		kind: string
		tag?: string
		props?: Record<string, unknown>
	}
	assertEquals(node.kind, "element")
	assertEquals(node.tag, "div")
	const props = node.props || {}
	assertEquals(props.id, "sales")
	assertEquals(props["data-viz"], "Line")
	assertEquals(props["data-viz-x"], "date")
	assertEquals(props["data-viz-y"], "value")
})
