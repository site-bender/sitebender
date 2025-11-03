import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import _timesMapper from "./index.ts"

//++ Tests for _timesMapper (private helper)

Deno.test("_timesMapper applies function to index", function testTimesMapperBasic() {
	function double(n: number): number {
		return n * 2
	}

	const mapper = _timesMapper(double)
	assertEquals(mapper(undefined, 0), 0)
	assertEquals(mapper(undefined, 5), 10)
	assertEquals(mapper(undefined, 10), 20)
})

Deno.test("_timesMapper applies identity function", function testTimesMapperIdentity() {
	function identity(n: number): number {
		return n
	}

	const mapper = _timesMapper(identity)
	assertEquals(mapper(undefined, 0), 0)
	assertEquals(mapper(undefined, 42), 42)
	assertEquals(mapper(undefined, 100), 100)
})

Deno.test("_timesMapper applies constant function", function testTimesMapperConstant() {
	function constant(_n: number): string {
		return "x"
	}

	const mapper = _timesMapper(constant)
	assertEquals(mapper(undefined, 0), "x")
	assertEquals(mapper(undefined, 5), "x")
	assertEquals(mapper(undefined, 100), "x")
})

Deno.test("_timesMapper applies complex function", function testTimesMapperComplex() {
	function toChar(n: number): string {
		return String.fromCharCode(65 + n)
	}

	const mapper = _timesMapper(toChar)
	assertEquals(mapper(undefined, 0), "A")
	assertEquals(mapper(undefined, 1), "B")
	assertEquals(mapper(undefined, 25), "Z")
})

Deno.test("_timesMapper property: result equals function applied to index", function testTimesMapperProperty() {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 1000 }),
			function testApplication(index) {
				function square(n: number): number {
					return n * n
				}

				const mapper = _timesMapper(square)
				const result = mapper(undefined, index)
				return result === index * index
			},
		),
	)
})

Deno.test("_timesMapper property: consistent results", function testTimesMapperConsistent() {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 100 }),
			function testConsistency(index) {
				function triple(n: number): number {
					return n * 3
				}

				const mapper = _timesMapper(triple)
				const first = mapper(undefined, index)
				const second = mapper(undefined, index)
				return first === second && first === index * 3
			},
		),
	)
})
