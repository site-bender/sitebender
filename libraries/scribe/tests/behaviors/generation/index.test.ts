import {
	assertEquals,
	assertStringIncludes,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	formatProperties,
	generateMarkdown,
} from "../../../src/generators/index.ts"
import {
	extractDescription,
	extractSignature,
} from "../../../src/extractors/index.ts"
import type {
	FunctionMetadata,
	FunctionSignature,
	Properties,
} from "../../../src/types/index.ts"

Deno.test("formatProperties - formats pure function badge", () => {
	const properties: Properties = {
		isPure: true,
		isCurried: false,
		isIdempotent: false,
		isCommutative: false,
		isAssociative: false,
		isDistributive: false,
		complexity: "O(1)",
		nullHandling: "unknown",
		deterministic: true,
	}

	const result = formatProperties(properties)
	assertStringIncludes(result, "Pure")
})

Deno.test("formatProperties - formats curried function badge", () => {
	const properties: Properties = {
		isPure: false,
		isCurried: true,
		curryLevels: 2,
		isIdempotent: false,
		isCommutative: false,
		isAssociative: false,
		isDistributive: false,
		complexity: "O(1)",
		nullHandling: "unknown",
		deterministic: false,
	}

	const result = formatProperties(properties)
	assertStringIncludes(result, "Curried (2 levels)")
})

Deno.test("formatProperties - formats multiple badges", () => {
	const properties: Properties = {
		isPure: true,
		isCurried: true,
		curryLevels: 2,
		isIdempotent: true,
		isCommutative: true,
		isAssociative: false,
		isDistributive: false,
		complexity: "O(1)",
		nullHandling: "unknown",
		deterministic: true,
	}

	const result = formatProperties(properties)
	assertStringIncludes(result, "Pure")
	assertStringIncludes(result, "Curried")
	assertStringIncludes(result, "Idempotent")
	assertStringIncludes(result, "Commutative")
})

Deno.test("formatProperties - handles no detected properties", () => {
	const properties: Properties = {
		isPure: false,
		isCurried: false,
		isIdempotent: false,
		isCommutative: false,
		isAssociative: false,
		isDistributive: false,
		complexity: "O(1)",
		nullHandling: "unknown",
		deterministic: false,
	}

	const result = formatProperties(properties)
	assertEquals(result, "None detected")
})

Deno.test("extractSignature - formats standard function signature", () => {
	const signature: FunctionSignature = {
		name: "add",
		parameters: [
			{ name: "x", type: "number", optional: false },
			{ name: "y", type: "number", optional: false },
		],
		returnType: "number",
		isAsync: false,
		isGenerator: false,
		isExported: true,
		isDefault: false,
	}

	const result = extractSignature(signature)
	assertEquals(result, "add(x: number, y: number): number")
})

Deno.test("extractSignature - formats curried function signature", () => {
	const signature: FunctionSignature = {
		name: "add",
		parameters: [
			{ name: "x", type: "number", optional: false },
		],
		returnType: "(y: number) => number",
		isAsync: false,
		isGenerator: false,
		isExported: true,
		isDefault: true,
	}

	const result = extractSignature(signature)
	assertEquals(result, "add(x: number) => (y: number) => number")
})

Deno.test("extractSignature - formats async function signature", () => {
	const signature: FunctionSignature = {
		name: "fetchData",
		parameters: [],
		returnType: "Promise<string>",
		isAsync: true,
		isGenerator: false,
		isExported: false,
		isDefault: false,
	}

	const result = extractSignature(signature)
	assertEquals(result, "async fetchData(): Promise<string>")
})

Deno.test("extractSignature - formats generic function signature", () => {
	const signature: FunctionSignature = {
		name: "identity",
		parameters: [
			{ name: "value", type: "T", optional: false },
		],
		returnType: "T",
		generics: [
			{ name: "T", constraint: "string" },
		],
		isAsync: false,
		isGenerator: false,
		isExported: true,
		isDefault: false,
	}

	const result = extractSignature(signature)
	assertEquals(result, "identity<T extends string>(value: T): T")
})

Deno.test("extractDescription - extracts single-line comment", () => {
	const source = `
// Adds two numbers together
export default function add(x: number, y: number): number {
	return x + y
}`

	const result = extractDescription(source, 2)
	assertEquals(result, "Adds two numbers together")
})

Deno.test("extractDescription - returns undefined when no comment", () => {
	const source = `
export default function add(x: number, y: number): number {
	return x + y
}`

	const result = extractDescription(source, 1)
	assertEquals(result, undefined)
})

Deno.test("generateMarkdown - generates complete documentation", () => {
	const metadata: FunctionMetadata = {
		signature: {
			name: "add",
			parameters: [
				{ name: "x", type: "number", optional: false },
			],
			returnType: "(y: number) => number",
			isAsync: false,
			isGenerator: false,
			isExported: true,
			isDefault: true,
		},
		description: "Adds two numbers",
		properties: {
			isPure: true,
			isCurried: true,
			curryLevels: 2,
			isIdempotent: false,
			isCommutative: false,
			isAssociative: false,
			isDistributive: false,
			complexity: "O(1)",
			nullHandling: "unknown",
			deterministic: true,
		},
		examples: [
			{ code: "add(2)(3)", result: "5" },
			{ code: "const add5 = add(5)", result: undefined },
		],
		laws: [
			{ name: "Commutativity", formula: "add(a)(b) = add(b)(a)" },
		],
		relatedFunctions: ["subtract", "multiply", "divide"],
	}

	const result = generateMarkdown(metadata)

	assertStringIncludes(result, "## add")
	assertStringIncludes(result, "Adds two numbers")
	assertStringIncludes(result, "Pure | Curried")
	assertStringIncludes(result, "add(x: number) => (y: number) => number")
	assertStringIncludes(result, "add(2)(3) // 5")
	assertStringIncludes(result, "Commutativity")
	assertStringIncludes(result, "O(1)")
	assertStringIncludes(result, "subtract, multiply, divide")
})

Deno.test("generateMarkdown - handles minimal metadata", () => {
	const metadata: FunctionMetadata = {
		signature: {
			name: "noop",
			parameters: [],
			returnType: "void",
			isAsync: false,
			isGenerator: false,
			isExported: false,
			isDefault: false,
		},
		properties: {
			isPure: false,
			isCurried: false,
			isIdempotent: false,
			isCommutative: false,
			isAssociative: false,
			isDistributive: false,
			complexity: "O(1)",
			nullHandling: "unknown",
			deterministic: false,
		},
		examples: [],
		laws: [],
		relatedFunctions: [],
	}

	const result = generateMarkdown(metadata)

	assertStringIncludes(result, "## noop")
	assertStringIncludes(result, "No description provided")
	assertStringIncludes(result, "noop(): void")
	assertStringIncludes(result, "O(1)")
})
