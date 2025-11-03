import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import _rangeMapper from "./index.ts"

//++ Tests for _rangeMapper (private helper)

Deno.test("_rangeMapper returns correct value for index", function testRangeMapperBasic() {
	const mapper = _rangeMapper(5)
	assertEquals(mapper(undefined, 0), 5)
	assertEquals(mapper(undefined, 1), 6)
	assertEquals(mapper(undefined, 10), 15)
})

Deno.test("_rangeMapper handles negative start", function testRangeMapperNegative() {
	const mapper = _rangeMapper(-5)
	assertEquals(mapper(undefined, 0), -5)
	assertEquals(mapper(undefined, 3), -2)
	assertEquals(mapper(undefined, 10), 5)
})

Deno.test("_rangeMapper handles zero start", function testRangeMapperZero() {
	const mapper = _rangeMapper(0)
	assertEquals(mapper(undefined, 0), 0)
	assertEquals(mapper(undefined, 5), 5)
	assertEquals(mapper(undefined, 100), 100)
})

Deno.test("_rangeMapper property: result equals start plus index", function testRangeMapperProperty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: 0, max: 1000 }),
			function testAddition(start, index) {
				const mapper = _rangeMapper(start)
				const result = mapper(undefined, index)
				return result === start + index
			},
		),
	)
})
