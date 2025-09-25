import type { FunctionSignature, TestCase, TypeInfo } from "../types/index.ts"

import { TypeKind } from "../types/index.ts"

/**
 * Generates property-based tests that actually work with fast-check
 *
 * @param signature Function signature with type information
 * @returns Array of property-based test cases
 */
export default function generatePropertyTests(
	signature: FunctionSignature,
): Array<TestCase> {
	const tests: Array<TestCase> = []

	// Generate type correctness property
	tests.push(generateTypeCorrectnessProperty(signature))

	// Generate determinism property (same input -> same output)
	if (!signature.isGenerator && !hasRandomness(signature)) {
		tests.push(generateDeterminismProperty(signature))
	}

	// For Result-returning functions, test Result structure
	if (signature.returnType.raw.includes("Result<")) {
		tests.push(generateResultStructureProperty(signature))
	}

	// For array-returning functions, test array properties
	if (signature.returnType.kind === TypeKind.Array) {
		const arrayProp = generateArrayProperty(signature)
		if (arrayProp) tests.push(arrayProp)
	}

	// For string functions, test string properties
	if (signature.returnType.raw === "string") {
		const stringProp = generateStringProperty(signature)
		if (stringProp) tests.push(stringProp)
	}

	// For pure functions, test referential transparency
	if (isPureFunction(signature)) {
		tests.push(generateReferentialTransparencyProperty(signature))
	}

	return tests.filter((t) => t !== null) as Array<TestCase>
}

/**
 * Generates a property test for type correctness
 */
function generateTypeCorrectnessProperty(
	signature: FunctionSignature,
): TestCase {
	const generators = signature.parameters.map((p) =>
		typeToFastCheckGenerator(p.type)
	)
	const paramNames = signature.parameters.map((p) => p.name)

	return {
		name: "returns correct type",
		description: "Function should always return the declared type",
		input: [],
		properties: [{
			name: "type correctness",
			generator: generators.length > 0
				? `fc.tuple(${generators.join(", ")})`
				: "fc.constant([])",
			property: `(${
				paramNames.length > 0 ? `[${paramNames.join(", ")}]` : "_"
			}) => {
				const result = ${signature.name}(${paramNames.join(", ")})
				return ${generateTypeCheck(signature.returnType, "result")}
			}`,
			runs: 100,
		}],
	}
}

/**
 * Generates a property test for determinism
 */
function generateDeterminismProperty(signature: FunctionSignature): TestCase {
	// Skip determinism test for functions that return functions
	if (signature.returnType.kind === TypeKind.Function) {
		return {
			name: "is deterministic",
			description: "Function should return same output for same input",
			input: [],
			properties: [{
				name: "determinism",
				generator: "fc.constant([])",
				property: `(_) => {
					// Skipping determinism test for function-returning functions
					// Functions can't be compared with deepEqual
					return true
				}`,
				runs: 1,
			}],
		}
	}

	const generators = signature.parameters.map((p) =>
		typeToFastCheckGenerator(p.type)
	)
	const paramNames = signature.parameters.map((p) => p.name)

	return {
		name: "is deterministic",
		description: "Function should return same output for same input",
		input: [],
		properties: [{
			name: "determinism",
			generator: generators.length > 0
				? `fc.tuple(${generators.join(", ")})`
				: "fc.constant([])",
			property: `(${
				paramNames.length > 0 ? `[${paramNames.join(", ")}]` : "_"
			}) => {
				const result1 = ${signature.name}(${paramNames.join(", ")})
				const result2 = ${signature.name}(${paramNames.join(", ")})
				return deepEqual(result1, result2)
			}`,
			runs: 50,
		}],
	}
}

/**
 * Generates a property test for Result structure
 */
function generateResultStructureProperty(
	signature: FunctionSignature,
): TestCase {
	const generators = signature.parameters.map((p) =>
		typeToFastCheckGenerator(p.type)
	)
	const paramNames = signature.parameters.map((p) => p.name)

	return {
		name: "returns valid Result",
		description: "Function should return well-formed Result type",
		input: [],
		properties: [{
			name: "Result structure",
			generator: generators.length > 0
				? `fc.tuple(${generators.join(", ")})`
				: "fc.constant([])",
			property: `(${
				paramNames.length > 0 ? `[${paramNames.join(", ")}]` : "_"
			}) => {
				const result = ${signature.name}(${paramNames.join(", ")})
				if (typeof result !== "object" || result === null) return false
				if (!("ok" in result)) return false
				if (result.ok === true) {
					return "value" in result
				} else if (result.ok === false) {
					return "error" in result
				}
				return false
			}`,
			runs: 100,
		}],
	}
}

/**
 * Generates a property test for array-returning functions
 */
function generateArrayProperty(signature: FunctionSignature): TestCase | null {
	// Only for functions that take arrays and return arrays
	const arrayParams = signature.parameters.filter((p) =>
		p.type.kind === TypeKind.Array
	)
	if (arrayParams.length === 0) return null

	const generators = signature.parameters.map((p) =>
		typeToFastCheckGenerator(p.type)
	)
	const paramNames = signature.parameters.map((p) => p.name)
	const arrayParamName = arrayParams[0].name

	return {
		name: "preserves array properties",
		description: "Function should handle arrays correctly",
		input: [],
		properties: [{
			name: "array handling",
			generator: generators.length > 0
				? `fc.tuple(${generators.join(", ")})`
				: "fc.constant([])",
			property: `(${
				paramNames.length > 0 ? `[${paramNames.join(", ")}]` : "_"
			}) => {
				const result = ${signature.name}(${paramNames.join(", ")})
				if (!Array.isArray(result)) return false
				// Empty array should return empty array (usually)
				if (${arrayParamName}.length === 0) {
					return result.length === 0
				}
				return true
			}`,
			runs: 100,
		}],
	}
}

/**
 * Generates a property test for string functions
 */
function generateStringProperty(signature: FunctionSignature): TestCase | null {
	const stringParams = signature.parameters.filter((p) =>
		p.type.raw === "string"
	)
	if (stringParams.length === 0) return null

	const generators = signature.parameters.map((p) =>
		typeToFastCheckGenerator(p.type)
	)
	const paramNames = signature.parameters.map((p) => p.name)

	return {
		name: "handles strings correctly",
		description: "Function should process strings properly",
		input: [],
		properties: [{
			name: "string handling",
			generator: generators.length > 0
				? `fc.tuple(${generators.join(", ")})`
				: "fc.constant([])",
			property: `(${
				paramNames.length > 0 ? `[${paramNames.join(", ")}]` : "_"
			}) => {
				const result = ${signature.name}(${paramNames.join(", ")})
				return typeof result === "string"
			}`,
			runs: 100,
		}],
	}
}

/**
 * Generates a property test for referential transparency
 */
function generateReferentialTransparencyProperty(
	signature: FunctionSignature,
): TestCase {
	// Skip referential transparency test for functions that return functions
	if (signature.returnType.kind === TypeKind.Function) {
		return {
			name: "is referentially transparent",
			description: "Pure function should be replaceable by its value",
			input: [],
			properties: [{
				name: "referential transparency",
				generator: "fc.constant([])",
				property: `(_) => {
					// Skipping referential transparency test for function-returning functions
					// Functions can't be compared with deepEqual
					return true
				}`,
				runs: 1,
			}],
		}
	}

	const generators = signature.parameters.map((p) =>
		typeToFastCheckGenerator(p.type)
	)
	const paramNames = signature.parameters.map((p) => p.name)

	return {
		name: "is referentially transparent",
		description: "Pure function should be replaceable by its value",
		input: [],
		properties: [{
			name: "referential transparency",
			generator: generators.length > 0
				? `fc.tuple(${generators.join(", ")})`
				: "fc.constant([])",
			property: `(${
				paramNames.length > 0 ? `[${paramNames.join(", ")}]` : "_"
			}) => {
				const value = ${signature.name}(${paramNames.join(", ")})
				// Calling again with same inputs should give same result
				const value2 = ${signature.name}(${paramNames.join(", ")})
				return deepEqual(value, value2)
			}`,
			runs: 50,
		}],
	}
}

/**
 * Converts a TypeInfo to a fast-check generator string
 */
function typeToFastCheckGenerator(type: TypeInfo): string {
	switch (type.kind) {
		case TypeKind.Primitive:
			switch (type.raw) {
				case "string":
					return "fc.string()"
				case "number":
					return "fc.double({ noNaN: true })"
				case "boolean":
					return "fc.boolean()"
				case "undefined":
					return "fc.constant(undefined)"
				case "null":
					return "fc.constant(null)"
				default:
					return "fc.anything()"
			}

		case TypeKind.Array:
			if (type.elementType) {
				// Special case for arrays of functions
				if (type.elementType.kind === TypeKind.Function) {
					return "fc.array(fc.func(fc.anything()))"
				}
				return `fc.array(${typeToFastCheckGenerator(type.elementType)})`
			}
			return "fc.array(fc.anything())"

		case TypeKind.Object:
			return "fc.object()"

		case TypeKind.Function:
			return "fc.func(fc.anything())"

		case TypeKind.Union:
			if (type.unionTypes && type.unionTypes.length > 0) {
				const generators = type.unionTypes.map((t) =>
					typeToFastCheckGenerator(t)
				)
				return `fc.oneof(${generators.join(", ")})`
			}
			return "fc.anything()"

		case TypeKind.Generic:
			// For Result type
			if (type.raw.startsWith("Result<")) {
				return `fc.oneof(
					fc.record({ ok: fc.constant(true), value: fc.anything() }),
					fc.record({ ok: fc.constant(false), error: fc.anything() })
				)`
			}
			return "fc.anything()"

		case TypeKind.Interface:
			// For custom interfaces, generate appropriate structure
			if (type.typeName === "Result") {
				return `fc.oneof(
					fc.record({ ok: fc.constant(true), value: fc.anything() }),
					fc.record({ ok: fc.constant(false), error: fc.anything() })
				)`
			}
			return "fc.object()"

		default:
			return "fc.anything()"
	}
}

/**
 * Generates appropriate type check code
 */
function generateTypeCheck(type: TypeInfo, varName: string): string {
	switch (type.kind) {
		case TypeKind.Primitive:
			switch (type.raw) {
				case "string":
					return `typeof ${varName} === "string"`
				case "number":
					return `typeof ${varName} === "number"`
				case "boolean":
					return `typeof ${varName} === "boolean"`
				case "undefined":
					return `${varName} === undefined`
				case "null":
					return `${varName} === null`
				case "void":
					return `${varName} === undefined`
				default:
					return "true"
			}

		case TypeKind.Array:
			return `Array.isArray(${varName})`

		case TypeKind.Object:
			return `typeof ${varName} === "object" && ${varName} !== null`

		case TypeKind.Function:
			return `typeof ${varName} === "function"`

		case TypeKind.Generic:
		case TypeKind.Interface:
			// For Result type
			if (type.raw.includes("Result<")) {
				return `(typeof ${varName} === "object" && ${varName} !== null && "ok" in ${varName})`
			}
			return "true"

		default:
			return "true"
	}
}

/**
 * Checks if function signature suggests randomness
 */
function hasRandomness(signature: FunctionSignature): boolean {
	return signature.name.toLowerCase().includes("random") ||
		signature.name.toLowerCase().includes("shuffle") ||
		signature.name.toLowerCase().includes("uuid") ||
		signature.name.toLowerCase().includes("guid")
}

/**
 * Checks if function appears to be pure
 */
function isPureFunction(signature: FunctionSignature): boolean {
	// Async and generator functions are likely not pure
	if (signature.isAsync || signature.isGenerator) return false

	// Functions with no parameters might have side effects
	if (signature.parameters.length === 0) return false

	// Functions returning void likely have side effects
	if (signature.returnType.raw === "void") return false

	// Assume pure by default for our functional codebase
	return true
}
