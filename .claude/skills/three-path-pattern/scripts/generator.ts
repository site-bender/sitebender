/**
 * Three-Path Pattern Function Generator
 *
 * Scaffolds directory structure and template files for three-path pattern functions.
 * Does NOT generate implementation - user must implement logic manually.
 */

export interface FunctionConfig {
	readonly name: string
	readonly description: string
	readonly basePath: string
}

/**
 * Generates directory structure for three-path pattern function
 */
export default function generateThreePathFunction(config: FunctionConfig): void {
	const { name, description, basePath } = config

	console.log(`\n🚀 Generating three-path function: ${name}`)
	console.log(`📂 Base path: ${basePath}\n`)

	const functionPath = `${basePath}/${name}`

	// Create directories
	_createDirectory(functionPath)
	_createDirectory(`${functionPath}/_${name}Array`)
	_createDirectory(`${functionPath}/_${name}ToResult`)
	_createDirectory(`${functionPath}/_${name}ToValidation`)

	// Create placeholder files
	_createMainFunction(functionPath)(name)(description)
	_createArrayHelper(functionPath)(name)
	_createResultHelper(functionPath)(name)
	_createValidationHelper(functionPath)(name)
	_createTestFile(functionPath)(name)

	console.log(`\n✅ Scaffolding complete!`)
	console.log(`\n📝 Next steps:`)
	console.log(`   1. Implement logic in _${name}Array/index.ts`)
	console.log(`   2. Implement logic in _${name}ToResult/index.ts`)
	console.log(`   3. Implement logic in _${name}ToValidation/index.ts`)
	console.log(`   4. Complete main function in ${name}/index.ts`)
	console.log(`   5. Write tests in ${name}/index.test.ts`)
	console.log(`   6. Run: deno task fmt && deno task lint`)
	console.log(`   7. Run: deno test ${functionPath}/index.test.ts\n`)
}

/**
 * Creates directory if it doesn't exist
 */
function _createDirectory(path: string): void {
	try {
		Deno.mkdirSync(path, { recursive: true })
		console.log(`✓ Created: ${path}`)
	} catch (error) {
		if (error instanceof Deno.errors.AlreadyExists) {
			console.log(`⚠ Already exists: ${path}`)
		} else {
			throw error
		}
	}
}

/**
 * Creates main function file with TODO placeholders
 */
function _createMainFunction(functionPath: string) {
	return function createMainFunctionAtPath(name: string) {
		return function createMainFunctionAtPathWithName(description: string): void {
			const content = `import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import _${name}Array from "./_${name}Array/index.ts"
import _${name}ToResult from "./_${name}ToResult/index.ts"
import _${name}ToValidation from "./_${name}ToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + ${description}
 */
export default function ${name}<E, T, U>(/* TODO: Add parameters */) {
	// TODO: Implement currying structure

	//++ [OVERLOAD] Array path: takes array, returns TODO
	// function ${name}WithParam(array: ReadonlyArray<T>): TODO

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	// function ${name}WithParam(array: Result<E, ReadonlyArray<T>>): Result<E, TODO>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	// function ${name}WithParam(array: Validation<E, ReadonlyArray<T>>): Validation<E, TODO>

	//++ Implementation of the full curried function
	function ${name}WithParam(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	): unknown /* TODO: Fix return type */ {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _${name}Array(/* TODO: Pass params */)(array)
		}

		// Result path: fail-fast monadic operation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_${name}ToResult(/* TODO: Pass params */))(array)
		}

		// Validation path: error accumulation monadic operation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_${name}ToValidation(/* TODO: Pass params */))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return ${name}WithParam
}
`

			const filePath = `${functionPath}/index.ts`
			Deno.writeTextFileSync(filePath, content)
			console.log(`✓ Created: ${filePath}`)
		}
	}
}

/**
 * Creates array helper file with TODO placeholders
 */
function _createArrayHelper(functionPath: string) {
	return function createArrayHelperAtPath(name: string): void {
		const content = `import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that processes a plain array
 */
export default function _${name}Array<T, U>(/* TODO: Add parameters */) {
	// TODO: Implement currying

	return function _${name}ArrayWithParam(
		array: ReadonlyArray<T>,
	): unknown /* TODO: Fix return type */ {
		// Happy path: valid inputs
		if (and(isFunction(/* TODO */))(isArray<T>(array))) {
			// TODO: Implement logic using native JS method
			// Remember to mark with [EXCEPTION] comment if using native method
			return undefined /* TODO: Implement */
		}

		// Fallback: return appropriate default
		return undefined /* TODO: Implement fallback */
	}
}
`

		const filePath = `${functionPath}/_${name}Array/index.ts`
		Deno.writeTextFileSync(filePath, content)
		console.log(`✓ Created: ${filePath}`)
	}
}

/**
 * Creates Result helper file with TODO placeholders
 */
function _createResultHelper(functionPath: string) {
	return function createResultHelperAtPath(name: string): void {
		const content = `import type { Result } from "../../../types/fp/result/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that processes an array and returns a Result
 */
export default function _${name}ToResult<E, T, U>(/* TODO: Add parameters */) {
	// TODO: Implement currying

	return function _${name}ToResultWithParam(
		array: ReadonlyArray<T>,
	): Result<E, unknown /* TODO: Fix return type */> {
		if (isFunction(/* TODO: param */)) {
			// Happy path: function and array are valid
			if (isArray(array)) {
				// TODO: Implement logic using native JS method
				const result = undefined /* TODO: Implement */
				return ok(result)
			}

			// Error: invalid array
			return error({
				code: "${name.toUpperCase()}_INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to ${name} over",
				severity: "requirement" as const,
			} as E)
		}

		// Error: invalid function
		return error({
			code: "${name.toUpperCase()}_INVALID_FUNCTION",
			field: "function",
			messages: ["Expected function but received invalid input"],
			received: typeof /* TODO: param */,
			expected: "Function",
			suggestion: "Provide a valid function to ${name} with",
			severity: "requirement" as const,
		} as E)
	}
}
`

		const filePath = `${functionPath}/_${name}ToResult/index.ts`
		Deno.writeTextFileSync(filePath, content)
		console.log(`✓ Created: ${filePath}`)
	}
}

/**
 * Creates Validation helper file with TODO placeholders
 */
function _createValidationHelper(functionPath: string) {
	return function createValidationHelperAtPath(name: string): void {
		const content = `import type { Validation } from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that processes an array and returns a Validation
 */
export default function _${name}ToValidation<E, T, U>(/* TODO: Add parameters */) {
	// TODO: Implement currying

	return function _${name}ToValidationWithParam(
		array: ReadonlyArray<T>,
	): Validation<E, unknown /* TODO: Fix return type */> {
		if (isFunction(/* TODO: param */)) {
			// Happy path: function and array are valid
			if (isArray(array)) {
				// TODO: Implement logic using native JS method
				const result = undefined /* TODO: Implement */
				return success(result)
			}

			// Error: invalid array (wrapped in array for accumulation)
			return failure([{
				code: "${name.toUpperCase()}_INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to ${name} over",
				severity: "requirement" as const,
			} as E])
		}

		// Error: invalid function (wrapped in array for accumulation)
		return failure([{
			code: "${name.toUpperCase()}_INVALID_FUNCTION",
			field: "function",
			messages: ["Expected function but received invalid input"],
			received: typeof /* TODO: param */,
			expected: "Function",
			suggestion: "Provide a valid function to ${name} with",
			severity: "requirement" as const,
		} as E])
	}
}
`

		const filePath = `${functionPath}/_${name}ToValidation/index.ts`
		Deno.writeTextFileSync(filePath, content)
		console.log(`✓ Created: ${filePath}`)
	}
}

/**
 * Creates test file with TODO placeholders
 */
function _createTestFile(functionPath: string) {
	return function createTestFileAtPath(name: string): void {
		const content = `import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import ${name} from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

// TODO: Implement tests for all three paths
// See references/reduce-example.md and references/map-example.md for patterns

Deno.test("${name} - plain array path", async function ${name}PlainArrayTests(t) {
	await t.step(
		"TODO: describe test case",
		function testCase() {
			// TODO: Implement test
			const result = ${name}(/* TODO: params */)([/* TODO: test data */])
			assertEquals(result, /* TODO: expected */)
		},
	)

	// TODO: Add more test cases
	// - Handle empty arrays
	// - Handle type transformations
	// - Handle edge cases
})

Deno.test("${name} - Result monad path", async function ${name}ResultTests(t) {
	await t.step(
		"TODO: describe test case",
		function testCase() {
			// TODO: Implement test
			const result = ${name}(/* TODO: params */)(ok([/* TODO: test data */]))
			assertEquals(result, ok(/* TODO: expected */))
		},
	)

	await t.step(
		"passes through error without processing",
		function passesErrorThrough() {
			const inputError = error({
				code: "UPSTREAM_ERROR",
				field: "data",
				messages: ["Upstream error occurred"],
				received: "null",
				expected: "Array",
				suggestion: "Fix upstream issue",
				severity: "requirement" as const,
			})

			const result = ${name}(/* TODO: params */)(inputError)

			assertEquals(result, inputError)
		},
	)
})

Deno.test("${name} - Validation monad path", async function ${name}ValidationTests(t) {
	await t.step(
		"TODO: describe test case",
		function testCase() {
			// TODO: Implement test
			const result = ${name}(/* TODO: params */)(success([/* TODO: test data */]))
			assertEquals(result, success(/* TODO: expected */))
		},
	)

	await t.step(
		"passes through failure without processing",
		function passesFailureThrough() {
			const inputFailure = failure([
				{
					code: "UPSTREAM_VALIDATION_ERROR",
					field: "data",
					messages: ["Validation failed upstream"],
					received: "null",
					expected: "Array",
					suggestion: "Fix validation issues",
					severity: "requirement" as const,
				},
			])

			const result = ${name}(/* TODO: params */)(inputFailure)

			assertEquals(result, inputFailure)
		},
	)
})

// TODO: Add property-based tests using fast-check
// See references for examples
`

		const filePath = `${functionPath}/index.test.ts`
		Deno.writeTextFileSync(filePath, content)
		console.log(`✓ Created: ${filePath}`)
	}
}
