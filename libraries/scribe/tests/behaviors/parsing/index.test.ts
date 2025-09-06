import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { parseFile, parseFunction } from "../../../src/parser/index.ts"

Deno.test("parseFile - parses valid TypeScript source", () => {
	const source = `
export default function add(x: number) {
	return function(y: number): number {
		return x + y
	}
}
`
	const result = parseFile(source, "test.ts")

	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.kind, "SourceFile")
		assertEquals(result.value.fileName, "test.ts")
		assertEquals(Array.isArray(result.value.statements), true)
	}
})

Deno.test("parseFile - handles empty content", () => {
	const result = parseFile("", "empty.ts")

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message, "Invalid source content")
	}
})

Deno.test("parseFile - finds function declarations", () => {
	const source = `function multiply(a: number, b: number): number {
	return a * b
}`

	const result = parseFile(source, "multiply.ts")

	assertEquals(result.ok, true)
	if (result.ok && result.value.statements) {
		const statements = result.value.statements as Array<any>
		assertEquals(statements.length > 0, true)
		assertEquals(statements[0].kind, "FunctionDeclaration")
		assertEquals(statements[0].name, "multiply")
	}
})

Deno.test("parseFile - finds arrow functions", () => {
	const source = `export const divide = (a: number, b: number) => a / b`

	const result = parseFile(source, "divide.ts")

	assertEquals(result.ok, true)
	if (result.ok && result.value.statements) {
		const statements = result.value.statements as Array<any>
		assertEquals(statements.length > 0, true)
		assertEquals(statements[0].kind, "ArrowFunction")
		assertEquals(statements[0].name, "divide")
		assertEquals(statements[0].isExported, true)
	}
})

Deno.test("parseFunction - extracts function signature", () => {
	const node = {
		kind: "FunctionDeclaration",
		pos: 0,
		end: 100,
		name: "add",
		isExported: true,
		isDefault: true,
	}

	const source =
		`export default function add(x: number): (y: number) => number {
	return function(y: number): number {
		return x + y
	}
}`

	const result = parseFunction(node, source)

	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.name, "add")
		assertEquals(result.value.parameters.length, 1)
		assertEquals(result.value.parameters[0].name, "x")
		assertEquals(result.value.parameters[0].type, "number")
		assertEquals(result.value.returnType, "(y: number) => number")
		assertEquals(result.value.isExported, true)
		assertEquals(result.value.isDefault, true)
	}
})

Deno.test("parseFunction - handles async functions", () => {
	const node = {
		kind: "FunctionDeclaration",
		pos: 0,
		end: 50,
		name: "fetchData",
	}

	const source = `async function fetchData(): Promise<string> {
	return "data"
}`

	const result = parseFunction(node, source)

	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.isAsync, true)
		assertEquals(result.value.returnType, "Promise<string>")
	}
})

Deno.test("parseFunction - handles generator functions", () => {
	const node = {
		kind: "FunctionDeclaration",
		pos: 0,
		end: 50,
		name: "generate",
	}

	const source = `function* generate(): Generator<number> {
	yield 1
}`

	const result = parseFunction(node, source)

	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.isGenerator, true)
	}
})

Deno.test("parseFunction - extracts generic parameters", () => {
	const node = {
		kind: "FunctionDeclaration",
		pos: 0,
		end: 100,
		name: "identity",
	}

	const source = `function identity<T extends string>(value: T): T {
	return value
}`

	const result = parseFunction(node, source)

	assertEquals(result.ok, true)
	if (result.ok && result.value.generics) {
		assertEquals(result.value.generics.length, 1)
		assertEquals(result.value.generics[0].name, "T")
		assertEquals(result.value.generics[0].constraint, "string")
	}
})

Deno.test("parseFunction - handles optional parameters", () => {
	const node = {
		kind: "FunctionDeclaration",
		pos: 0,
		end: 100,
		name: "greet",
	}

	const source = `function greet(name: string, title?: string): string {
	return title ? \`\${title} \${name}\` : name
}`

	const result = parseFunction(node, source)

	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.parameters.length, 2)
		assertEquals(result.value.parameters[0].optional, false)
		assertEquals(result.value.parameters[1].optional, true)
	}
})

Deno.test("parseFunction - rejects non-function nodes", () => {
	const node = {
		kind: "VariableStatement",
		pos: 0,
		end: 50,
	}

	const result = parseFunction(node, "const x = 5")

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(
			result.error.message.includes("Expected function node"),
			true,
		)
	}
})
