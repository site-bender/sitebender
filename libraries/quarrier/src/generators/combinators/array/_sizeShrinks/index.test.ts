import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import integer from "../../../primitives/integer/index.ts"
import _sizeShrinks from "./index.ts"

Deno.test("_sizeShrinks: returns empty array when already at minimum size", () => {
	const gen = integer(0, 100)
	const options = { minSize: 3, maxSize: 10 }
	const value = [1, 2, 3] // At minSize

	const shrinks = _sizeShrinks(gen)(options)(value)

	// Should only have empty array shrink, not size reductions
	const nonEmptyShrinks = shrinks.filter((s) => s.value.length > 0)
	assertEquals(nonEmptyShrinks.length, 0)
})

Deno.test("_sizeShrinks: includes empty array shrink when above minSize", () => {
	const gen = integer(0, 100)
	const options = { minSize: 0, maxSize: 10 }
	const value = [1, 2, 3, 4, 5]

	const shrinks = _sizeShrinks(gen)(options)(value)

	const hasEmpty = shrinks.some((s) => s.value.length === 0)
	assertEquals(hasEmpty, true)
})

Deno.test("_sizeShrinks: includes half-size shrinks", () => {
	const gen = integer(0, 100)
	const options = { minSize: 0, maxSize: 10 }
	const value = [1, 2, 3, 4, 5, 6, 7, 8]

	const shrinks = _sizeShrinks(gen)(options)(value)

	// Should have shrink to size 4 (half)
	const hasHalf = shrinks.some((s) => s.value.length === 4)
	assertEquals(hasHalf, true)
})

Deno.test("_sizeShrinks: respects minSize for half shrinks", () => {
	const gen = integer(0, 100)
	const options = { minSize: 3, maxSize: 10 }
	const value = [1, 2, 3, 4] // Length 4, half would be 2 which is below minSize

	const shrinks = _sizeShrinks(gen)(options)(value)

	// Should not have shrink to size 2
	const hasSizeTwoShrink = shrinks.some((s) =>
		s.value.length === 2 && s.value.length > 0
	)
	assertEquals(hasSizeTwoShrink, false)
})

Deno.test("_sizeShrinks: includes single element removal shrinks", () => {
	const gen = integer(0, 100)
	const options = { minSize: 2, maxSize: 10 }
	const value = [1, 2, 3, 4, 5]

	const shrinks = _sizeShrinks(gen)(options)(value)

	// Should have shrinks removing first and last elements
	const hasSize4 = shrinks.some((s) => s.value.length === 4)
	assertEquals(hasSize4, true)

	// Check that first element removal exists
	const withoutFirst = shrinks.some((s) =>
		s.value.length === 4 && s.value[0] === 2
	)
	assertEquals(withoutFirst, true)

	// Check that last element removal exists
	const withoutLast = shrinks.some((s) =>
		s.value.length === 4 && s.value[3] === 4
	)
	assertEquals(withoutLast, true)
})

Deno.test("_sizeShrinks: shrink children are functions", () => {
	const gen = integer(0, 100)
	const options = { minSize: 0, maxSize: 10 }
	const value = [1, 2, 3]

	const shrinks = _sizeShrinks(gen)(options)(value)

	for (const shrink of shrinks) {
		assertEquals(typeof shrink.children, "function")
		const children = shrink.children()
		assertEquals(Array.isArray(children), true)
	}
})

Deno.test("_sizeShrinks: uses default options when not provided", () => {
	const gen = integer(0, 100)
	const options = {} // Will use defaults: minSize = 0, maxSize = 10
	const value = [1, 2, 3]

	const shrinks = _sizeShrinks(gen)(options)(value)

	// Should have shrinks since default minSize is 0
	assertEquals(shrinks.length > 0, true)

	// Should include empty array
	const hasEmpty = shrinks.some((s) => s.value.length === 0)
	assertEquals(hasEmpty, true)
})

Deno.test("_sizeShrinks: preserves element values during size shrinks", () => {
	const gen = integer(0, 100)
	const options = { minSize: 0, maxSize: 10 }
	const value = [10, 20, 30, 40, 50]

	const shrinks = _sizeShrinks(gen)(options)(value)

	for (const shrink of shrinks) {
		// All elements in shrink should be from original
		for (const elem of shrink.value) {
			assertEquals(value.includes(elem as number), true)
		}
	}
})
