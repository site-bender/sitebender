import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import integer from "../../../primitives/integer/index.ts"
import _shrinkElements from "./index.ts"

Deno.test("_shrinkElements: returns empty array for empty input", () => {
	const gen = integer(0, 100)
	const shrinks = _shrinkElements(gen)([])

	assertEquals(shrinks.length, 0)
})

Deno.test("_shrinkElements: generates shrinks for each element", () => {
	const gen = integer(0, 100)
	const elements = [50, 75, 100]
	const shrinks = _shrinkElements(gen)(elements)

	// Should have shrinks for each element that can shrink
	assertEquals(shrinks.length > 0, true)

	// Each shrink should modify exactly one element
	for (const shrink of shrinks) {
		let differences = 0
		for (let i = 0; i < elements.length; i++) {
			if (shrink.value[i] !== elements[i]) {
				differences++
			}
		}
		assertEquals(differences, 1)
	}
})

Deno.test("_shrinkElements: shrinks preserve array length", () => {
	const gen = integer(0, 100)
	const elements = [10, 20, 30, 40]
	const shrinks = _shrinkElements(gen)(elements)

	for (const shrink of shrinks) {
		assertEquals(shrink.value.length, elements.length)
	}
})

Deno.test("_shrinkElements: shrink children are functions", () => {
	const gen = integer(0, 100)
	const elements = [50]
	const shrinks = _shrinkElements(gen)(elements)

	if (shrinks.length > 0) {
		assertEquals(typeof shrinks[0].children, "function")
		const children = shrinks[0].children()
		assertEquals(Array.isArray(children), true)
	}
})

Deno.test("_shrinkElements: shrinks move towards zero for integers", () => {
	const gen = integer(0, 100)
	const elements = [50, 75]
	const shrinks = _shrinkElements(gen)(elements)

	// Should have shrinks that reduce values
	const hasSmaller = shrinks.some((shrink) =>
		shrink.value.some((v, i) => v < elements[i])
	)
	assertEquals(hasSmaller, true)
})

Deno.test("_shrinkElements: handles single element array", () => {
	const gen = integer(0, 100)
	const elements = [42]
	const shrinks = _shrinkElements(gen)(elements)

	assertEquals(shrinks.length > 0, true)
	// First shrink should be towards 0
	if (shrinks.length > 0) {
		assertEquals(shrinks[0].value[0] < 42, true)
	}
})

Deno.test("_shrinkElements: handles array with non-shrinkable elements", () => {
	const gen = integer(0, 100)
	const elements = [0, 0, 0] // Already at shrink target
	const shrinks = _shrinkElements(gen)(elements)

	// Should have no shrinks since all are at target
	assertEquals(shrinks.length, 0)
})
