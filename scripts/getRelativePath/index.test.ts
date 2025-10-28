import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import getRelativePath from "./index.ts"

Deno.test("getRelativePath - basic relative path calculation", () => {
	const result = getRelativePath("a/b/c/index.ts")("a/x/y/index.ts")

	assertEquals(result, "../../x/y/index.ts")
})

Deno.test("getRelativePath - same directory level", () => {
	const result = getRelativePath("src/architect/index.ts")(
		"src/utils/helpers.ts",
	)

	assertEquals(result, "../utils/helpers.ts")
})

Deno.test("getRelativePath - no common ancestor", () => {
	const result = getRelativePath("frontend/src/index.ts")(
		"backend/api/routes.ts",
	)

	assertEquals(result, "../../backend/api/routes.ts")
})

Deno.test("getRelativePath - same directory", () => {
	const result = getRelativePath("src/architect/index.ts")(
		"src/architect/Button.tsx",
	)

	assertEquals(result, "Button.tsx")
})

Deno.test("getRelativePath - deeper nesting from", () => {
	const result = getRelativePath("a/b/c/d/e/index.ts")("a/x/y.ts")
	assertEquals(result, "../../../../x/y.ts")
})

Deno.test("getRelativePath - deeper nesting to", () => {
	const result = getRelativePath("a/b/index.ts")("a/x/y/z/deep.ts")

	assertEquals(result, "../x/y/z/deep.ts")
})

Deno.test("getRelativePath - root level files", () => {
	const result = getRelativePath("index.ts")("config.ts")

	assertEquals(result, "config.ts")
})

Deno.test("getRelativePath - partial common path", () => {
	const result = getRelativePath("libraries/toolsmith/src/array/index.ts")(
		"libraries/shared/utils/helpers.ts",
	)

	assertEquals(result, "../../../shared/utils/helpers.ts")
})

Deno.test("getRelativePath - complex nested structure", () => {
	const result = getRelativePath("apps/web/src/architect/ui/Button/index.ts")(
		"libs/shared/types/api.ts",
	)

	assertEquals(result, "../../../../../../libs/shared/types/api.ts")
})

Deno.test("getRelativePath - curried function works", () => {
	const getRelativeFromPagewright = getRelativePath("src/architect/index.ts")

	assertEquals(
		getRelativeFromPagewright("src/utils/helpers.ts"),
		"../utils/helpers.ts",
	)
	assertEquals(
		getRelativeFromPagewright("src/types/user.ts"),
		"../types/user.ts",
	)
	assertEquals(
		getRelativeFromPagewright("src/architect/Button.tsx"),
		"Button.tsx",
	)
})

Deno.test("getRelativePath - preserves file extensions", () => {
	const result = getRelativePath("src/index.ts")("lib/utils.js")

	assertEquals(result, "../lib/utils.js")
})

Deno.test("getRelativePath - handles non-index.ts files in from path", () => {
	const result = getRelativePath("src/architect/Button.tsx")(
		"src/utils/helpers.ts",
	)

	assertEquals(result, "../utils/helpers.ts")
})
