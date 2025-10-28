import type { BrandedTypeConfig } from "./types.ts"

export async function generateBrandedType(
	config: BrandedTypeConfig,
): Promise<void> {
	const {
		name,
		baseType,
		targetFolder,
		description,
		predicateName,
		errorCode,
	} = config

	const lowerName = name.charAt(0).toLowerCase() + name.slice(1)
	const predicate = predicateName || `is${name}`
	const code = errorCode || `${name.toUpperCase()}_INVALID`

	// Determine base paths
	const typeBasePath = targetFolder
		? `${targetFolder}/types/${name}`
		: `types/${name}`
	const newtypeBasePath = targetFolder
		? `${targetFolder}/newtypes/${name}`
		: `newtypes/${name}`

	// Create directories
	await Deno.mkdir(typeBasePath, { recursive: true })
	await Deno.mkdir(newtypeBasePath, { recursive: true })
	await Deno.mkdir(`${newtypeBasePath}/unsafe${name}`, { recursive: true })
	await Deno.mkdir(`${newtypeBasePath}/unwrap${name}`, { recursive: true })

	// Generate type definition
	await Deno.writeTextFile(
		`${typeBasePath}/index.ts`,
		generateTypeDefinition(name, baseType, description),
	)

	// Generate smart constructor
	await Deno.writeTextFile(
		`${newtypeBasePath}/index.ts`,
		generateSmartConstructor(name, lowerName, baseType, predicate, code),
	)

	// Generate unsafe constructor
	await Deno.writeTextFile(
		`${newtypeBasePath}/unsafe${name}/index.ts`,
		generateUnsafeConstructor(name, lowerName, baseType),
	)

	// Generate unwrap function
	await Deno.writeTextFile(
		`${newtypeBasePath}/unwrap${name}/index.ts`,
		generateUnwrapFunction(name, lowerName, baseType),
	)

	// Generate test file
	await Deno.writeTextFile(
		`${newtypeBasePath}/index.test.ts`,
		generateTestFile(name, lowerName),
	)

	console.log(`✅ Generated branded type: ${name}`)
	console.log(`   Type definition: ${typeBasePath}/index.ts`)
	console.log(`   Smart constructor: ${newtypeBasePath}/index.ts`)
	console.log(
		`   Unsafe constructor: ${newtypeBasePath}/unsafe${name}/index.ts`,
	)
	console.log(`   Unwrap function: ${newtypeBasePath}/unwrap${name}/index.ts`)
	console.log(`   Tests: ${newtypeBasePath}/index.test.ts`)
}

function generateTypeDefinition(
	name: string,
	baseType: string,
	description?: string,
): string {
	const descriptionComment = description ? `/*++\n + ${description}\n */\n` : ""

	return `import type { Brand } from "@sitebender/toolsmith/types/branded/index.ts"

${descriptionComment}export type ${name} = Brand<${baseType}, "${name}">
`
}

function generateSmartConstructor(
	name: string,
	lowerName: string,
	baseType: string,
	predicate: string,
	code: string,
): string {
	return `import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { ${name} } from "../../types/${name}/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
// TODO: Import the predicate function
// import ${predicate} from "@sitebender/toolsmith/predicates/${predicate}/index.ts"

/*++
 + Smart constructor for ${name}
 + Validates the input and returns a Result<ValidationError, ${name}>
 */
export default function ${lowerName}(value: ${baseType}): Result<ValidationError, ${name}> {
	// TODO: Replace this placeholder validation with your actual predicate
	const isValid = true // Replace with: ${predicate}(value)

	if (isValid) {
		return ok(value as ${name})
	}

	return error({
		code: "${code}",
		field: "${lowerName}",
		messages: ["The system needs a valid ${lowerName}..."],
		received: value,
		expected: "Valid ${name}",
		suggestion: "TODO: Provide actionable guidance for fixing this error",
		constraints: {
			// TODO: Add specific constraints here
		},
		severity: "requirement" as const,
	})
}
`
}

function generateUnsafeConstructor(
	name: string,
	_lowerName: string,
	baseType: string,
): string {
	return `import type { ${name} } from "../../../types/${name}/index.ts"

/*++
 + Brands value as ${name} without validation
 + USE ONLY when value is guaranteed to be valid (e.g., from trusted source)
 + Prefer the smart constructor for user input
 */
export default function unsafe${name}(value: ${baseType}): ${name} {
	return value as ${name}
}
`
}

function generateUnwrapFunction(
	name: string,
	_lowerName: string,
	baseType: string,
): string {
	return `import type { ${name} } from "../../../types/${name}/index.ts"

/*++
 + Extracts the underlying base type from a branded ${name}
 + Useful when interfacing with external APIs that expect primitives
 */
export default function unwrap${name}(value: ${name}): ${baseType} {
	return value as ${baseType}
}
`
}

function generateTestFile(name: string, lowerName: string): string {
	const testFunctionName = `${lowerName}Tests`

	return `import { assert, assertEquals } from "@std/assert"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

import ${lowerName} from "./index.ts"
import unsafe${name} from "./unsafe${name}/index.ts"
import unwrap${name} from "./unwrap${name}/index.ts"

Deno.test("${lowerName} smart constructor", async function ${testFunctionName}(t) {
	await t.step(
		"returns Ok for valid input",
		function returnsOkForValidInput() {
			// TODO: Replace with actual valid input
			const result = ${lowerName}("valid-input" as never)
			assert(isOk(result))
		},
	)

	await t.step(
		"returns Error for invalid input",
		function returnsErrorForInvalidInput() {
			// TODO: Replace with actual invalid input
			const result = ${lowerName}("invalid-input" as never)
			assert(isError(result))

			if (isError(result)) {
				assertEquals(result.error.code, "${name.toUpperCase()}_INVALID")
			}
		},
	)
})

Deno.test("unsafe${name} constructor", async function unsafe${name}Tests(t) {
	await t.step(
		"brands value without validation",
		function brandsWithoutValidation() {
			// TODO: Replace with actual input
			const branded = unsafe${name}("test-value" as never)
			// Type assertion validates it's branded
			const _typeCheck: ${name} = branded
			assert(branded !== undefined)
		},
	)
})

Deno.test("unwrap${name} function", async function unwrap${name}Tests(t) {
	await t.step(
		"extracts underlying primitive",
		function extractsUnderlying() {
			// TODO: Replace with actual input
			const branded = unsafe${name}("test-value" as never)
			const unwrapped = unwrap${name}(branded)
			assertEquals(unwrapped, "test-value")
		},
	)
})
`
}
