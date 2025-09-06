import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import compile from "../../src/transform/compile/minimal.ts"
import { VizBar } from "../../src/transform/index.ts"

const el = (
	tag: string,
	props: Record<string, unknown> = {},
	children?: unknown,
) => ({
	type: tag,
	props: children === undefined ? props : { ...props, children },
})

Deno.test("golden: Viz.Bar emits SSR-safe container via minimal compiler", () => {
	const tree = [
		el("section", { id: "charts" }),
		VizBar({
			id: "inventory",
			x: "sku",
			y: "count",
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
	assertEquals(props.id, "inventory")
	assertEquals(props["data-viz"], "Bar")
	assertEquals(props["data-viz-x"], "sku")
	assertEquals(props["data-viz-y"], "count")
})
