import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import integer from "../../../primitives/integer/index.ts"
import boolean from "../../../primitives/boolean/index.ts"
import _shrinkTupleElements from "./index.ts"

Deno.test("_shrinkTupleElements: returns empty array for empty generators", () => {
	const generators: any[] = []
	const value: any[] = []

	const shrinks = _shrinkTupleElements(generators)(value)

	assertEquals(shrinks.length, 0)
})

Deno.test("_shrinkTupleElements: generates shrinks for each position", () => {
	const generators = [
		integer(0, 100),
		integer(0, 100),
		integer(0, 100),
	]
	const value = [50, 75, 100]

	const shrinks = _shrinkTupleElements(generators)(value)

	// Should have shrinks for each position
	assertEquals(shrinks.length > 0, true)

	// Each shrink should modify exactly one position
	for (const shrink of shrinks) {
		let differences = 0
		for (let i = 0; i < value.length; i++) {
			if (shrink.value[i] !== value[i]) {
				differences++
			}
		}
		assertEquals(differences, 1)
	}
})

Deno.test("_shrinkTupleElements: preserves tuple length", () => {
	const generators = [
		integer(0, 100),
		boolean,
		integer(0, 10),
	]
	const value = [42, true, 5]

	const shrinks = _shrinkTupleElements(generators)(value)

	for (const shrink of shrinks) {
		assertEquals(shrink.value.length, 3)
	}
})

Deno.test("_shrinkTupleElements: shrink children are functions", () => {
	const generators = [integer(0, 100)]
	const value = [50]

	const shrinks = _shrinkTupleElements(generators)(value)

	if (shrinks.length > 0) {
		assertEquals(typeof shrinks[0].children, "function")
		const children = shrinks[0].children()
		assertEquals(Array.isArray(children), true)
	}
})

Deno.test("_shrinkTupleElements: handles mixed types correctly", () => {
	const generators = [
		integer(0, 100),
		boolean,
		integer(0, 10),
	]
	const value = [50, true, 5] as [number, boolean, number]

	const shrinks = _shrinkTupleElements(generators)(value)

	// Should have shrinks for position 0 (integer)
	const hasFirstShrink = shrinks.some((s) =>
		s.value[0] !== value[0] && s.value[1] === value[1] &&
		s.value[2] === value[2]
	)
	assertEquals(hasFirstShrink, true)

	// Should have shrinks for position 1 (boolean)
	const hasSecondShrink = shrinks.some((s) =>
		s.value[0] === value[0] && s.value[1] !== value[1] &&
		s.value[2] === value[2]
	)
	assertEquals(hasSecondShrink, true)

	// Should have shrinks for position 2 (integer)
	const hasThirdShrink = shrinks.some((s) =>
		s.value[0] === value[0] && s.value[1] === value[1] &&
		s.value[2] !== value[2]
	)
	assertEquals(hasThirdShrink, true)
})

Deno.test("_shrinkTupleElements: handles non-shrinkable elements", () => {
	const generators = [
		integer(0, 100),
		boolean,
	]
	const value = [0, false] // Both at shrink targets

	const shrinks = _shrinkTupleElements(generators)(value)

	// Should have no shrinks since both are at target
	assertEquals(shrinks.length, 0)
})

Deno.test("_shrinkTupleElements: shrinks move towards targets", () => {
	const generators = [
		integer(0, 100),
		integer(-50, 50),
	]
	const value = [50, 25]

	const shrinks = _shrinkTupleElements(generators)(value)

	// First element should shrink towards 0
	const firstShrinks = shrinks.filter((s) => s.value[0] !== value[0])
	if (firstShrinks.length > 0) {
		assertEquals(firstShrinks[0].value[0] < 50, true)
	}

	// Second element should shrink towards 0
	const secondShrinks = shrinks.filter((s) => s.value[1] !== value[1])
	if (secondShrinks.length > 0) {
		assertEquals(Math.abs(secondShrinks[0].value[1]) < 25, true)
	}
})
