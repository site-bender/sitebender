// Minimal smoke tests for our jsx-runtime
// Avoid import maps and rely on relative imports so TypeScript can see modules.
import { jsx, jsxs } from "../../src/jsx-runtime.ts"

// Tiny assertion helpers to avoid external dependencies
function assert(condition: unknown, message?: string): asserts condition {
	if (!condition) throw new Error(message || "Assertion failed")
}
function assertEquals(a: unknown, b: unknown, message?: string) {
	if (a !== b) throw new Error(message || `Expected ${a} === ${b}`)
}

// Deno global type shim for TS; runtime will supply the real global
declare const Deno: {
	test: (name: string, fn: () => void) => void
}

Deno.test("intrinsic element with single text child", () => {
	const vnode = jsx("div", { id: "a", children: "Hello" }) as { type: string; props: Record<string, unknown> }
	assert(vnode)
	assertEquals(vnode.type, "div")
	assertEquals(vnode.props.id, "a")
	assertEquals(vnode.props.children, "Hello")
})

Deno.test("intrinsic element with multiple children", () => {
	const vnode = jsxs("ul", {
		children: [jsx("li", { children: "A" }), jsx("li", { children: "B" })],
	}) as { type: string; props: Record<string, unknown> }
	assertEquals(vnode.type, "ul")
	assert(Array.isArray(vnode.props.children))
	const kids = vnode.props.children as { type: string; props: Record<string, unknown> }[]
	assertEquals(kids.length, 2)
	assertEquals(kids[0].type, "li")
	assertEquals(kids[0].props.children, "A")
})

Deno.test("function component returns intrinsic vnode", () => {
	function Mini(props: { label: string }) {
		return jsx("span", { children: props.label })
	}
	const out = jsx(Mini, { label: "X" }) as { type: string; props: Record<string, unknown> }
	assertEquals(out.type, "span")
	assertEquals(out.props.children, "X")
})
