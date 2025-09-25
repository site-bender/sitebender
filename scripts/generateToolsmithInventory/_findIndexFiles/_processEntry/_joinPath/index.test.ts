import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _joinPath from "./index.ts"

Deno.test("_joinPath - joins paths without slashes", () => {
	const result = _joinPath("base")("segment")
	assertEquals(result, "base/segment")
})

Deno.test("_joinPath - handles base ending with slash", () => {
	const result = _joinPath("base/")("segment")
	assertEquals(result, "base/segment")
})

Deno.test("_joinPath - handles segment starting with slash", () => {
	const result = _joinPath("base")("/segment")
	assertEquals(result, "base/segment")
})

Deno.test("_joinPath - handles both base ending and segment starting with slash", () => {
	const result = _joinPath("base/")("/segment")
	assertEquals(result, "base/segment")
})

Deno.test("_joinPath - handles nested paths", () => {
	const result = _joinPath("path/to/base")("segment/file.ts")
	assertEquals(result, "path/to/base/segment/file.ts")
})

Deno.test("_joinPath - handles single character paths", () => {
	const result = _joinPath("a")("b")
	assertEquals(result, "a/b")
})

Deno.test("_joinPath - handles empty base", () => {
	const result = _joinPath("")("segment")
	assertEquals(result, "/segment")
})

Deno.test("_joinPath - handles empty segment", () => {
	const result = _joinPath("base")("")
	assertEquals(result, "base/")
})

Deno.test("_joinPath - handles both empty", () => {
	const result = _joinPath("")("")
	assertEquals(result, "/")
})

Deno.test("_joinPath - normalizes multiple trailing slashes", () => {
	const result = _joinPath("base//")("segment")
	assertEquals(result, "base/segment")

	const result2 = _joinPath("base///")("segment")
	assertEquals(result2, "base/segment")

	const result3 = _joinPath("base////")("segment")
	assertEquals(result3, "base/segment")
})

Deno.test("_joinPath - normalizes multiple leading slashes", () => {
	const result = _joinPath("base")("//segment")
	assertEquals(result, "base/segment")

	const result2 = _joinPath("base")("///segment")
	assertEquals(result2, "base/segment")

	const result3 = _joinPath("base")("////segment")
	assertEquals(result3, "base/segment")
})

Deno.test("_joinPath - normalizes both multiple trailing and leading slashes", () => {
	const result = _joinPath("base///")("///segment")
	assertEquals(result, "base/segment")
})

Deno.test("_joinPath - curried function works correctly", () => {
	const joinToBase = _joinPath("src/pagewright")

	assertEquals(joinToBase("Button"), "src/pagewright/Button")
	assertEquals(joinToBase("Layout"), "src/pagewright/Layout")
	assertEquals(joinToBase("/Modal"), "src/pagewright/Modal")
})

Deno.test("_joinPath - handles root path as base", () => {
	const result = _joinPath("/")("segment")
	assertEquals(result, "/segment")
})

Deno.test("_joinPath - handles root path as segment", () => {
	const result = _joinPath("base")("/")
	assertEquals(result, "base/")
})

Deno.test("_joinPath - handles absolute paths", () => {
	const result = _joinPath("/absolute/path")("segment")
	assertEquals(result, "/absolute/path/segment")
})

Deno.test("_joinPath - preserves file extensions", () => {
	const result = _joinPath("src/utils")("helper.ts")
	assertEquals(result, "src/utils/helper.ts")
})

Deno.test("_joinPath - handles paths with dots", () => {
	const result = _joinPath("./src")("../utils")
	assertEquals(result, "./src/../utils")
})

Deno.test("_joinPath - handles paths with spaces", () => {
	const result = _joinPath("my folder")("my file.ts")
	assertEquals(result, "my folder/my file.ts")
})
