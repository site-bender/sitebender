import { assertEquals } from "jsr:@std/assert@1"
import { join } from "jsr:@std/path@1"
import resolveModulePath from "./index.ts"

Deno.test("resolveModulePath - resolves relative import with ./", () => {
	const fromFile = join(
		Deno.cwd(),
		"src/privacy/isValidImport/index.ts",
	)
	const importSpecifier = "../isPrivateFunction/index.ts"

	const result = resolveModulePath(fromFile)(importSpecifier)

	assertEquals(
		result,
		join(Deno.cwd(), "src/privacy/isPrivateFunction/index.ts"),
	)
})

Deno.test("resolveModulePath - resolves relative import with ../", () => {
	const fromFile = join(
		Deno.cwd(),
		"src/privacy/isValidImport/index.ts",
	)
	const importSpecifier = "../getParentScope/index.ts"

	const result = resolveModulePath(fromFile)(importSpecifier)

	assertEquals(
		result,
		join(Deno.cwd(), "src/privacy/getParentScope/index.ts"),
	)
})

Deno.test("resolveModulePath - handles index.ts resolution for directory import", () => {
	const fromFile = join(
		Deno.cwd(),
		"src/importGraph/buildGraph/index.ts",
	)
	const importSpecifier = "../parseImports"

	const result = resolveModulePath(fromFile)(importSpecifier)

	// Should resolve to index.ts in the directory
	assertEquals(
		result.endsWith("/parseImports/index.ts") ||
			result.endsWith("/parseImports.ts"),
		true,
	)
})

Deno.test("resolveModulePath - skips external modules", () => {
	const fromFile = join(
		Deno.cwd(),
		"src/privacy/isValidImport/index.ts",
	)
	const importSpecifier = "@sitebender/toolsmith/array/map/index.ts"

	const result = resolveModulePath(fromFile)(importSpecifier)

	// External modules are returned as-is
	assertEquals(result, "@sitebender/toolsmith/array/map/index.ts")
})

Deno.test("resolveModulePath - handles absolute paths", () => {
	const fromFile = join(
		Deno.cwd(),
		"src/privacy/isValidImport/index.ts",
	)
	const importSpecifier = "/absolute/path/to/module.ts"

	const result = resolveModulePath(fromFile)(importSpecifier)

	assertEquals(result, "/absolute/path/to/module.ts")
})

Deno.test("resolveModulePath - resolves path without extension to .ts", () => {
	const fromFile = join(Deno.cwd(), "src/types/index.ts")
	const importSpecifier = "./index"

	const result = resolveModulePath(fromFile)(importSpecifier)

	// Should add .ts extension or resolve to index.ts
	assertEquals(result.endsWith(".ts"), true)
})

Deno.test("resolveModulePath - handles nested relative paths", () => {
	const fromFile = join(
		Deno.cwd(),
		"src/privacy/isValidImport/index.ts",
	)
	const importSpecifier = "../../types/index.ts"

	const result = resolveModulePath(fromFile)(importSpecifier)

	assertEquals(
		result,
		join(Deno.cwd(), "src/types/index.ts"),
	)
})

Deno.test("resolveModulePath - preserves .tsx extension", () => {
	const fromFile = "/project/src/components/Button/index.tsx"
	const importSpecifier = "../Input/index.tsx"

	const result = resolveModulePath(fromFile)(importSpecifier)

	assertEquals(result, "/project/src/components/Input/index.tsx")
})
