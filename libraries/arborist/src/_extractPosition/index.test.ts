import { assert, assertEquals } from "jsr:@std/assert@1.0.14"

import type { Span } from "../types/index.ts"

import _extractPosition from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_extractPosition - valid span returns ok with position", function testValidSpan() {
	const span: Span = { start: 10, end: 50 }
	const result = _extractPosition(span)

	assert(isOk(result), "Should return ok for valid span")

	if (isOk(result)) {
		assertEquals(result.value.line, 1, "Line should be 1 (simplified)")
		assertEquals(result.value.column, 10, "Column should match span.start")
	}
})

Deno.test("_extractPosition - span at offset 0 returns ok", function testZeroOffset() {
	const span: Span = { start: 0, end: 100 }
	const result = _extractPosition(span)

	assert(isOk(result), "Should return ok for span starting at 0")

	if (isOk(result)) {
		assertEquals(result.value.line, 1)
		assertEquals(result.value.column, 0)
	}
})

Deno.test("_extractPosition - span with same start and end returns ok", function testSameStartEnd() {
	const span: Span = { start: 42, end: 42 }
	const result = _extractPosition(span)

	assert(isOk(result), "Should return ok for zero-width span")

	if (isOk(result)) {
		assertEquals(result.value.line, 1)
		assertEquals(result.value.column, 42)
	}
})

Deno.test("_extractPosition - negative start returns error", function testNegativeStart() {
	const span: Span = { start: -5, end: 10 }
	const result = _extractPosition(span)

	assert(isError(result), "Should return error for negative start")

	if (isError(result)) {
		assertEquals(result.error.kind, "NegativeOffset")
		assertEquals(result.error.operation, "_extractPosition")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
		assert(
			result.error.message.includes("negative offset"),
			"Error message should mention negative offset",
		)
		assertEquals(result.error.span, span, "Error should include the span")
	}
})

Deno.test("_extractPosition - negative end returns error", function testNegativeEnd() {
	const span: Span = { start: 10, end: -5 }
	const result = _extractPosition(span)

	assert(isError(result), "Should return error for negative end")

	if (isError(result)) {
		assertEquals(result.error.kind, "NegativeOffset")
		assertEquals(result.error.operation, "_extractPosition")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
	}
})

Deno.test("_extractPosition - both negative returns error", function testBothNegative() {
	const span: Span = { start: -10, end: -5 }
	const result = _extractPosition(span)

	assert(isError(result), "Should return error for both negative")

	if (isError(result)) {
		assertEquals(result.error.kind, "NegativeOffset")
	}
})

Deno.test("_extractPosition - end less than start returns error", function testInvalidRange() {
	const span: Span = { start: 100, end: 50 }
	const result = _extractPosition(span)

	assert(isError(result), "Should return error for end < start")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpan")
		assertEquals(result.error.operation, "_extractPosition")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
		assert(
			result.error.message.includes("invalid range"),
			"Error message should mention invalid range",
		)
		assert(
			result.error.message.includes("end (50) < start (100)"),
			"Error message should show the values",
		)
		assertEquals(result.error.span, span, "Error should include the span")
	}
})

Deno.test("_extractPosition - large valid span returns ok", function testLargeSpan() {
	const span: Span = { start: 1000000, end: 2000000 }
	const result = _extractPosition(span)

	assert(isOk(result), "Should return ok for large valid span")

	if (isOk(result)) {
		assertEquals(result.value.column, 1000000)
	}
})
