import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _getCategoryFromPath from "./index.ts"

Deno.test("_getCategoryFromPath - returns category name from vanilla path", () => {
	const path = "libraries/toolsmith/src/vanilla/array/map/index.ts"
	const result = _getCategoryFromPath(path)
	assertEquals(result, "array")
})

Deno.test("_getCategoryFromPath - returns category for different categories", () => {
	assertEquals(
		_getCategoryFromPath("libraries/toolsmith/src/vanilla/string/split/index.ts"),
		"string",
	)
	assertEquals(
		_getCategoryFromPath("libraries/toolsmith/src/vanilla/math/add/index.ts"),
		"math",
	)
	assertEquals(
		_getCategoryFromPath("libraries/toolsmith/src/vanilla/logic/and/index.ts"),
		"logic",
	)
	assertEquals(
		_getCategoryFromPath(
			"libraries/toolsmith/src/vanilla/validation/isNil/index.ts",
		),
		"validation",
	)
})

Deno.test("_getCategoryFromPath - handles nested subfolders", () => {
	const path =
		"libraries/toolsmith/src/vanilla/array/nested/deep/function/index.ts"
	const result = _getCategoryFromPath(path)
	assertEquals(result, "array")
})

Deno.test("_getCategoryFromPath - returns 'other' when no vanilla in path", () => {
	const path = "libraries/toolsmith/src/react/hooks/useEffect/index.ts"
	const result = _getCategoryFromPath(path)
	assertEquals(result, "other")
})

Deno.test("_getCategoryFromPath - returns 'other' for non-toolsmith paths", () => {
	const path = "scripts/someScript/index.ts"
	const result = _getCategoryFromPath(path)
	assertEquals(result, "other")
})

Deno.test("_getCategoryFromPath - handles vanilla at different positions", () => {
	assertEquals(
		_getCategoryFromPath("some/other/path/vanilla/category/function/index.ts"),
		"category",
	)
	assertEquals(
		_getCategoryFromPath("vanilla/direct/function/index.ts"),
		"direct",
	)
})

Deno.test("_getCategoryFromPath - returns 'other' when vanilla is last part", () => {
	const path = "libraries/toolsmith/src/vanilla"
	const result = _getCategoryFromPath(path)
	assertEquals(result, "other")
})

Deno.test("_getCategoryFromPath - returns 'other' for empty path", () => {
	const result = _getCategoryFromPath("")
	assertEquals(result, "other")
})

Deno.test("_getCategoryFromPath - handles paths with no slashes", () => {
	const result = _getCategoryFromPath("index.ts")
	assertEquals(result, "other")
})

Deno.test("_getCategoryFromPath - handles paths with vanilla as filename", () => {
	const path = "some/path/vanilla.ts"
	const result = _getCategoryFromPath(path)
	assertEquals(result, "other")
})
