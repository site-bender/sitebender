import { assert, assertEquals } from "jsr:@std/assert@1.0.14"

import type { SwcSpan } from "../types/index.ts"

import _extractSpan from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_extractSpan - valid node with span returns ok", function testValidSpan() {
	const node = {
		type: "FunctionDeclaration",
		span: { start: 10, end: 50, ctxt: 0 } as SwcSpan,
	}

	const result = _extractSpan(node)

	assert(isOk(result), "Should return ok for node with valid span")

	if (isOk(result)) {
		assertEquals(result.value.start, 10)
		assertEquals(result.value.end, 50)
	}
})

Deno.test("_extractSpan - node with zero-width span returns ok", function testZeroWidthSpan() {
	const node = {
		type: "Identifier",
		span: { start: 42, end: 42, ctxt: 0 } as SwcSpan,
	}

	const result = _extractSpan(node)

	assert(isOk(result), "Should return ok for zero-width span")

	if (isOk(result)) {
		assertEquals(result.value.start, 42)
		assertEquals(result.value.end, 42)
	}
})

Deno.test("_extractSpan - node with span at offset 0 returns ok", function testSpanAtZero() {
	const node = {
		type: "Module",
		span: { start: 0, end: 1000, ctxt: 0 } as SwcSpan,
	}

	const result = _extractSpan(node)

	assert(isOk(result), "Should return ok for span starting at 0")

	if (isOk(result)) {
		assertEquals(result.value.start, 0)
		assertEquals(result.value.end, 1000)
	}
})

Deno.test("_extractSpan - node without span property returns error", function testMissingSpan() {
	const node = {
		type: "SomeNode",
	}

	const result = _extractSpan(node)

	assert(isError(result), "Should return error for node without span")

	if (isError(result)) {
		assertEquals(result.error.kind, "MissingSpan")
		assertEquals(result.error.operation, "_extractSpan")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
		assertEquals(result.error.nodeType, "SomeNode")
		assert(
			result.error.message.includes("no span property"),
			"Error message should mention missing span",
		)
	}
})

Deno.test("_extractSpan - node without type property uses 'unknown' in error", function testMissingType() {
	const node = {}

	const result = _extractSpan(node)

	assert(isError(result), "Should return error for node without span")

	if (isError(result)) {
		assertEquals(result.error.kind, "MissingSpan")
		assertEquals(result.error.nodeType, "unknown")
	}
})

Deno.test("_extractSpan - span with negative start returns error", function testNegativeStart() {
	const node = {
		type: "BadNode",
		span: { start: -10, end: 50, ctxt: 0 } as SwcSpan,
	}

	const result = _extractSpan(node)

	assert(isError(result), "Should return error for negative start")

	if (isError(result)) {
		assertEquals(result.error.kind, "NegativeValues")
		assertEquals(result.error.operation, "_extractSpan")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
		assertEquals(result.error.nodeType, "BadNode")
		assert(
			result.error.message.includes("negative values"),
			"Error message should mention negative values",
		)
	}
})

Deno.test("_extractSpan - span with negative end returns error", function testNegativeEnd() {
	const node = {
		type: "BadNode",
		span: { start: 50, end: -10, ctxt: 0 } as SwcSpan,
	}

	const result = _extractSpan(node)

	assert(isError(result), "Should return error for negative end")

	if (isError(result)) {
		assertEquals(result.error.kind, "NegativeValues")
		assertEquals(result.error.nodeType, "BadNode")
	}
})

Deno.test("_extractSpan - span with both negative returns error", function testBothNegative() {
	const node = {
		type: "BadNode",
		span: { start: -50, end: -10, ctxt: 0 } as SwcSpan,
	}

	const result = _extractSpan(node)

	assert(isError(result), "Should return error for both negative")

	if (isError(result)) {
		assertEquals(result.error.kind, "NegativeValues")
	}
})

Deno.test("_extractSpan - span with end < start returns error", function testInvalidRange() {
	const node = {
		type: "InvalidNode",
		span: { start: 100, end: 50, ctxt: 0 } as SwcSpan,
	}

	const result = _extractSpan(node)

	assert(isError(result), "Should return error for end < start")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidRange")
		assertEquals(result.error.operation, "_extractSpan")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
		assertEquals(result.error.nodeType, "InvalidNode")
		assert(
			result.error.message.includes("invalid range"),
			"Error message should mention invalid range",
		)
		assert(
			result.error.message.includes("end (50) < start (100)"),
			"Error message should show the values",
		)
	}
})

Deno.test("_extractSpan - large valid span returns ok", function testLargeSpan() {
	const node = {
		type: "LargeFile",
		span: { start: 1000000, end: 5000000, ctxt: 0 } as SwcSpan,
	}

	const result = _extractSpan(node)

	assert(isOk(result), "Should return ok for large valid span")

	if (isOk(result)) {
		assertEquals(result.value.start, 1000000)
		assertEquals(result.value.end, 5000000)
	}
})
