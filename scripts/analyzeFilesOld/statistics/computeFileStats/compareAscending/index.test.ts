import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts"

import compareAscending from "./index.ts"

//++ Tests for compareAscending function
Deno.test("compareAscending", async function testCompareAscending(t) {
	await t.step("returns negative when a < b", function testLessThan() {
		const result = compareAscending(1, 5)
		assert(result < 0)
		assertEquals(result, -4)
	})

	await t.step("returns positive when a > b", function testGreaterThan() {
		const result = compareAscending(10, 3)
		assert(result > 0)
		assertEquals(result, 7)
	})

	await t.step("returns zero when a equals b", function testEqual() {
		const result = compareAscending(5, 5)
		assertEquals(result, 0)
	})

	await t.step("handles negative numbers", function testNegatives() {
		assertEquals(compareAscending(-5, -2), -3)
		assertEquals(compareAscending(-2, -5), 3)
		assertEquals(compareAscending(-3, -3), 0)
	})

	await t.step("handles mixed positive and negative", function testMixed() {
		assertEquals(compareAscending(-5, 5), -10)
		assertEquals(compareAscending(5, -5), 10)
		assertEquals(compareAscending(0, -5), 5)
		assertEquals(compareAscending(0, 5), -5)
	})

	await t.step("sorts array correctly", function testArraySort() {
		const numbers = [5, 2, 8, 1, 9, 3]
		const sorted = numbers.sort(compareAscending)
		assertEquals(sorted, [1, 2, 3, 5, 8, 9])
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/statistics/computeFileStats/compareAscending/index.test.ts