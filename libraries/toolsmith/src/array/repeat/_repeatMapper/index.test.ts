import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import _repeatMapper from "./index.ts"

//++ Tests for _repeatMapper (private helper)

Deno.test("_repeatMapper returns the item", function testRepeatMapperBasic() {
	const mapper = _repeatMapper("x")
	assertEquals(mapper(), "x")
	assertEquals(mapper(), "x")
	assertEquals(mapper(), "x")
})

Deno.test("_repeatMapper returns numbers", function testRepeatMapperNumbers() {
	const mapper = _repeatMapper(42)
	assertEquals(mapper(), 42)
	assertEquals(mapper(), 42)
})

Deno.test("_repeatMapper returns objects", function testRepeatMapperObjects() {
	const obj = { a: 1 }
	const mapper = _repeatMapper(obj)
	assertEquals(mapper(), obj)
	assertEquals(mapper(), obj)
})

Deno.test("_repeatMapper returns null and undefined", function testRepeatMapperNullish() {
	const mapperNull = _repeatMapper(null)
	assertEquals(mapperNull(), null)

	const mapperUndefined = _repeatMapper(undefined)
	assertEquals(mapperUndefined(), undefined)
})

Deno.test("_repeatMapper property: always returns same item", function testRepeatMapperProperty() {
	fc.assert(
		fc.property(
			fc.anything(),
			function testSameItem(item) {
				const mapper = _repeatMapper(item)
				const first = mapper()
				const second = mapper()
				const third = mapper()

				if (Number.isNaN(item)) {
					return Number.isNaN(first) && Number.isNaN(second) &&
						Number.isNaN(third)
				}

				return first === item && second === item && third === item
			},
		),
	)
})
