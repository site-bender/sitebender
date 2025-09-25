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

Deno.test("Contract Boundaries: Envoy cannot import from Auditor", () => {
	const result = validateImport("envoy", "auditor", "import { test } from '@sitebender/auditor'")

	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import auditor")),
		true,
	)
})

Deno.test("Contract Boundaries: Envoy CAN import from Arborist", () => {
	const result = validateImport("envoy", "arborist", "import { parseFile } from '@sitebender/arborist'")

	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Arborist cannot import from Envoy", () => {
	const result = validateImport("arborist", "envoy", "import { doc } from '@sitebender/envoy'")

	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import envoy")),
		true,
	)
})

Deno.test("Contract Boundaries: Toolsmith cannot import any @sitebender library", () => {
	const result = validateImport("toolsmith", "arborist", "import { parse } from '@sitebender/arborist'")

	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import any @sitebender")),
		true,
	)
})

Deno.test("Contract Boundaries: Auditor cannot import TypeScript", () => {
	const result = validateImport("auditor", "typescript", "import ts from 'typescript'")

	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import typescript")),
		true,
	)
})

Deno.test("Contract Boundaries: Auditor CAN import from Arborist", () => {
	const result = validateImport("auditor", "arborist", "import { parseFile } from '@sitebender/arborist'")

	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Auditor CAN import from Quarrier", () => {
	const result = validateImport("auditor", "quarrier", "import { arbitrary } from '@sitebender/quarrier'")

	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Pagewright cannot import from Envoy", () => {
	const result = validateImport("pagewright", "envoy", "import { doc } from '@sitebender/envoy'")

	assertEquals(result.valid, false)
	assertEquals(result.errors.length > 0, true)
})

Deno.test("Contract Boundaries: Agent cannot import from Arborist", () => {
	const result = validateImport("agent", "arborist", "import { parse } from '@sitebender/arborist'")

	assertEquals(result.valid, false)
	assertEquals(result.errors.length > 0, true)
})
