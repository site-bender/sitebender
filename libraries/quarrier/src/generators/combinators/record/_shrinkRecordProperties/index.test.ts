import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import integer from "../../../primitives/integer/index.ts"
import boolean from "../../../primitives/boolean/index.ts"
import _shrinkRecordProperties from "./index.ts"

Deno.test("_shrinkRecordProperties: returns empty array for no keys", () => {
	const generators = {}
	const value = {}
	const keys: string[] = []

	const shrinks = _shrinkRecordProperties(generators)(value)(keys)

	assertEquals(shrinks.length, 0)
})

Deno.test("_shrinkRecordProperties: generates shrinks for each property", () => {
	const generators = {
		a: integer(0, 100),
		b: integer(0, 100),
		c: integer(0, 100),
	}
	const value = { a: 50, b: 75, c: 100 }
	const keys = ["a", "b", "c"]

	const shrinks = _shrinkRecordProperties(generators)(value)(keys)

	// Should have shrinks for each property
	assertEquals(shrinks.length > 0, true)

	// Each shrink should modify exactly one property
	for (const shrink of shrinks) {
		let differences = 0
		for (const key of keys) {
			if (shrink.value[key] !== value[key]) {
				differences++
			}
		}
		assertEquals(differences, 1)
	}
})

Deno.test("_shrinkRecordProperties: preserves all properties", () => {
	const generators = {
		x: integer(0, 100),
		y: boolean,
		z: integer(0, 10),
	}
	const value = { x: 42, y: true, z: 5 }
	const keys = ["x", "y", "z"]

	const shrinks = _shrinkRecordProperties(generators)(value)(keys)

	for (const shrink of shrinks) {
		assertEquals(Object.keys(shrink.value).sort(), ["x", "y", "z"])
	}
})

Deno.test("_shrinkRecordProperties: shrink children are functions", () => {
	const generators = {
		value: integer(0, 100),
	}
	const value = { value: 50 }
	const keys = ["value"]

	const shrinks = _shrinkRecordProperties(generators)(value)(keys)

	if (shrinks.length > 0) {
		assertEquals(typeof shrinks[0].children, "function")
		const children = shrinks[0].children()
		assertEquals(Array.isArray(children), true)
	}
})

Deno.test("_shrinkRecordProperties: handles mixed types correctly", () => {
	const generators = {
		num: integer(0, 100),
		bool: boolean,
		small: integer(0, 10),
	}
	const value = { num: 50, bool: true, small: 5 }
	const keys = ["num", "bool", "small"]

	const shrinks = _shrinkRecordProperties(generators)(value)(keys)

	// Should have shrinks for num property
	const hasNumShrink = shrinks.some((s) =>
		s.value.num !== value.num && s.value.bool === value.bool &&
		s.value.small === value.small
	)
	assertEquals(hasNumShrink, true)

	// Should have shrinks for bool property
	const hasBoolShrink = shrinks.some((s) =>
		s.value.num === value.num && s.value.bool !== value.bool &&
		s.value.small === value.small
	)
	assertEquals(hasBoolShrink, true)

	// Should have shrinks for small property
	const hasSmallShrink = shrinks.some((s) =>
		s.value.num === value.num && s.value.bool === value.bool &&
		s.value.small !== value.small
	)
	assertEquals(hasSmallShrink, true)
})

Deno.test("_shrinkRecordProperties: handles non-shrinkable properties", () => {
	const generators = {
		a: integer(0, 100),
		b: boolean,
	}
	const value = { a: 0, b: false } // Both at shrink targets
	const keys = ["a", "b"]

	const shrinks = _shrinkRecordProperties(generators)(value)(keys)

	// Should have no shrinks since both are at target
	assertEquals(shrinks.length, 0)
})

Deno.test("_shrinkRecordProperties: shrinks move towards targets", () => {
	const generators = {
		positive: integer(0, 100),
		negative: integer(-100, 0),
	}
	const value = { positive: 50, negative: -50 }
	const keys = ["positive", "negative"]

	const shrinks = _shrinkRecordProperties(generators)(value)(keys)

	// Positive property should shrink towards 0
	const positiveShrinks = shrinks.filter((s) =>
		s.value.positive !== value.positive
	)
	if (positiveShrinks.length > 0) {
		assertEquals(positiveShrinks[0].value.positive < 50, true)
	}

	// Negative property should shrink towards 0
	const negativeShrinks = shrinks.filter((s) =>
		s.value.negative !== value.negative
	)
	if (negativeShrinks.length > 0) {
		assertEquals(Math.abs(negativeShrinks[0].value.negative) < 50, true)
	}
})

Deno.test("_shrinkRecordProperties: handles single property", () => {
	const generators = {
		only: integer(0, 100),
	}
	const value = { only: 42 }
	const keys = ["only"]

	const shrinks = _shrinkRecordProperties(generators)(value)(keys)

	assertEquals(shrinks.length > 0, true)
	if (shrinks.length > 0) {
		assertEquals(Object.keys(shrinks[0].value).length, 1)
		assertEquals("only" in shrinks[0].value, true)
		assertEquals(shrinks[0].value.only < 42, true)
	}
})
