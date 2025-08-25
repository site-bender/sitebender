import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import createElement from "../../../src/helpers/createElement/index.ts"
import compile from "../../../src/transform/compile/minimal.ts"
import On from "../../../src/transform/control/On/index.tsx"

function el(
	tag: string,
	props?: Record<string, unknown> | null,
	...children: unknown[]
) {
	return createElement(tag, props ?? null, ...children)
}

type BehaviorOn = { kind: "on"; event: string; handler?: unknown }

describe("compile/minimal - control:on marker", () => {
	it("attaches On behavior to previous sibling element", () => {
		const tree = el(
			"div",
			{ id: "a" },
			// target element first
			el("p", { id: "p1" }, "child"),
			// On.Submit marker follows, should attach to previous element sibling
			createElement(On, { event: "Submit" }, el("span", null, "handler")),
		)

		const ir = compile(tree)
		assertEquals(ir.length, 1)
		const root = ir[0]
		if (root.kind !== "element") throw new Error("expected element root")
		assertEquals(root.children.length, 1)
		const firstChild = root.children[0]
		if (firstChild.kind !== "element") throw new Error("expected element child")
		assertEquals(firstChild.tag, "p")
		assertEquals(firstChild.behaviors?.length ?? 0, 1)
		const beh = firstChild.behaviors?.[0] as BehaviorOn
		assertEquals(beh.kind, "on")
		assertEquals(beh.event, "Submit")
	})
})
