//++ Tests to ensure library boundaries are enforced according to contracts

import { assertEquals, assertExists } from "@std/assert"
import validateImport from "../../libraries/warden/src/validation/validateImport/index.ts"

Deno.test("Contract Boundaries: Envoy cannot import TypeScript", () => {
	const result = validateImport("envoy", "typescript", "import ts from 'typescript'")

	assertEquals(result.valid, false)
	assertEquals(result.errors.length > 0, true)
	assertEquals(
		result.errors.some(e => e.includes("CANNOT import TypeScript")),
		true,
	)
})

Deno.test("Contract Boundaries: Envoy cannot import from Logician", () => {
	const result = validateImport("envoy", "logician", "import { test } from '@sitebender/logician'")

	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import logician")),
		true,
	)
})

Deno.test("Contract Boundaries: Envoy CAN import from Linguist", () => {
	const result = validateImport("envoy", "linguist", "import { parseFile } from '@sitebender/linguist'")

	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Linguist cannot import from Envoy", () => {
	const result = validateImport("linguist", "envoy", "import { doc } from '@sitebender/envoy'")

	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import envoy")),
		true,
	)
})

Deno.test("Contract Boundaries: Toolsmith cannot import any @sitebender library", () => {
	const result = validateImport("toolsmith", "linguist", "import { parse } from '@sitebender/linguist'")

	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import any @sitebender")),
		true,
	)
})

Deno.test("Contract Boundaries: Logician cannot import TypeScript", () => {
	const result = validateImport("logician", "typescript", "import ts from 'typescript'")

	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import typescript")),
		true,
	)
})

Deno.test("Contract Boundaries: Logician CAN import from Linguist", () => {
	const result = validateImport("logician", "linguist", "import { parseFile } from '@sitebender/linguist'")

	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Logician CAN import from Quarrier", () => {
	const result = validateImport("logician", "quarrier", "import { arbitrary } from '@sitebender/quarrier'")

	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Codewright cannot import from Envoy", () => {
	const result = validateImport("codewright", "envoy", "import { doc } from '@sitebender/envoy'")

	assertEquals(result.valid, false)
	assertEquals(result.errors.length > 0, true)
})

Deno.test("Contract Boundaries: Agent cannot import from Linguist", () => {
	const result = validateImport("agent", "linguist", "import { parse } from '@sitebender/linguist'")

	assertEquals(result.valid, false)
	assertEquals(result.errors.length > 0, true)
})
