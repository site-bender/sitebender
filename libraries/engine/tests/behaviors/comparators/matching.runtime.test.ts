import { assertEquals } from "jsr:@std/assert"

import type { ComparatorNode, InjectorNode } from "../../../types/ir/index.ts"

import createComposeContext from "../../../src/context/composeContext.ts"
import registerDefaultExecutors from "../../../src/operations/defaults/registerDefaults.ts"
import evaluateNode from "../../../src/runtime/evaluate/index.ts"

const nodeId = () => crypto.randomUUID()
const constInjector = (value: unknown): InjectorNode => ({
	v: "0.1.0",
	kind: "injector",
	id: nodeId(),
	injector: "From.Constant",
	datatype: "String",
	args: { value },
})

const cmp3 = (
	cmp: string,
	a: unknown,
	b: unknown,
	c?: unknown,
): ComparatorNode => ({
	v: "0.1.0",
	kind: "comparator",
	id: nodeId(),
	cmp,
	args: [
		constInjector(a),
		constInjector(b),
		...(c !== undefined ? [constInjector(c)] : []),
	],
})

Deno.test("Matches/DoesNotMatch runtime with invalid regex flags/patterns", async () => {
	const ctx = createComposeContext({ env: "server" })
	registerDefaultExecutors(ctx)

	// Invalid flag
	const m1 = await evaluateNode(cmp3("Matches", "abc", "a.c", "invalid"), ctx)
	assertEquals(m1, false)

	const nm1 = await evaluateNode(
		cmp3("DoesNotMatch", "abc", "a.c", "invalid"),
		ctx,
	)
	// Invalid regex → DoesNotMatch returns false (cannot assert mismatch)
	assertEquals(nm1, false)

	// Invalid pattern
	const m2 = await evaluateNode(cmp3("Matches", "abc", "[z-"), ctx)
	assertEquals(m2, false)

	const nm2 = await evaluateNode(cmp3("DoesNotMatch", "abc", "[z-"), ctx)
	assertEquals(nm2, false)
})

Deno.test("Matches/DoesNotMatch runtime happy paths, including non-string operand coercion", async () => {
	const ctx = createComposeContext({ env: "server" })
	registerDefaultExecutors(ctx)

	// Simple match
	const m1 = await evaluateNode(cmp3("Matches", "abc", "^a.c$", "i"), ctx)
	assertEquals(m1, true)

	// Simple non-match
	const nm1 = await evaluateNode(cmp3("DoesNotMatch", "abc", "^z"), ctx)
	assertEquals(nm1, true)

	// Non-string operand coerced to string
	const m2 = await evaluateNode(cmp3("Matches", 12345, "^\\d+$"), ctx)
	assertEquals(m2, true)
})
