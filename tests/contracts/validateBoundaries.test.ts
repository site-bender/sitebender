//++ Tests to ensure library boundaries are enforced according to contracts

import { assertEquals, assertExists } from "@std/assert"
import { validateImport } from "../../libraries/contracts/enforcement/index.ts"

Deno.test("Contract Boundaries: Envoy cannot import TypeScript", () => {
	const result = validateImport("envoy", "typescript", "import ts from 'typescript'")
	
	assertEquals(result.valid, false)
	assertEquals(result.errors.length > 0, true)
	assertEquals(
		result.errors.some(e => e.includes("CANNOT import TypeScript")),
		true,
	)
})

Deno.test("Contract Boundaries: Envoy cannot import from Prover", () => {
	const result = validateImport("envoy", "prover", "import { test } from '@sitebender/prover'")
	
	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import prover")),
		true,
	)
})

Deno.test("Contract Boundaries: Envoy CAN import from Parser", () => {
	const result = validateImport("envoy", "parser", "import { parseFile } from '@sitebender/parser'")
	
	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Parser cannot import from Envoy", () => {
	const result = validateImport("parser", "envoy", "import { doc } from '@sitebender/envoy'")
	
	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import envoy")),
		true,
	)
})

Deno.test("Contract Boundaries: Toolkit cannot import any @sitebender library", () => {
	const result = validateImport("toolkit", "parser", "import { parse } from '@sitebender/parser'")
	
	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import any @sitebender")),
		true,
	)
})

Deno.test("Contract Boundaries: Prover cannot import TypeScript", () => {
	const result = validateImport("prover", "typescript", "import ts from 'typescript'")
	
	assertEquals(result.valid, false)
	assertEquals(
		result.errors.some(e => e.includes("cannot import typescript")),
		true,
	)
})

Deno.test("Contract Boundaries: Prover CAN import from Parser", () => {
	const result = validateImport("prover", "parser", "import { parseFile } from '@sitebender/parser'")
	
	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Prover CAN import from Foundry", () => {
	const result = validateImport("prover", "foundry", "import { arbitrary } from '@sitebender/foundry'")
	
	assertEquals(result.valid, true)
	assertEquals(result.errors.length, 0)
})

Deno.test("Contract Boundaries: Components cannot import from Envoy", () => {
	const result = validateImport("components", "envoy", "import { doc } from '@sitebender/envoy'")
	
	assertEquals(result.valid, false)
	assertEquals(result.errors.length > 0, true)
})

Deno.test("Contract Boundaries: Mesh cannot import from Parser", () => {
	const result = validateImport("mesh", "parser", "import { parse } from '@sitebender/parser'")
	
	assertEquals(result.valid, false)
	assertEquals(result.errors.length > 0, true)
})