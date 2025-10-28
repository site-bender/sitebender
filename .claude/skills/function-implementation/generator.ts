/**
 * Core function generator - transforms FunctionConfig into TypeScript code
 * Can be imported and used programmatically
 */

import type { Conjunction, FunctionConfig, Parameter } from "./types.ts"

//++ Main API: generates function files from configuration
export async function generateFunction(config: FunctionConfig): Promise<void> {
	const { name, parameters, targetFolder } = config

	// Validate configuration
	validateConfig(config)

	// Build full path: targetFolder/name or just name
	const fullPath = targetFolder ? `${targetFolder}/${name}` : name

	console.log(`Generating function: ${name} with ${parameters.length} parameter(s)...`)
	if (targetFolder) {
		console.log(`Target folder: ${targetFolder}`)
	}

	// Create directory
	await Deno.mkdir(fullPath, { recursive: true })

	// Generate index.ts
	const functionCode = generateFunctionCode(config)
	await Deno.writeTextFile(`${fullPath}/index.ts`, functionCode)

	// Generate index.test.ts
	const testCode = generateTestCode(config)
	await Deno.writeTextFile(`${fullPath}/index.test.ts`, testCode)

	console.log("✓ Function generated successfully!")
	console.log(`\nCreated:`)
	console.log(`  ${fullPath}/index.ts`)
	console.log(`  ${fullPath}/index.test.ts`)
}

//++ Validates the function configuration
function validateConfig(config: FunctionConfig): void {
	const { name, parameters, returns } = config

	if (!name || typeof name !== "string") {
		throw new Error("Function name is required and must be a string")
	}

	if (!isCamelCase(name)) {
		throw new Error(`Function name must be in camelCase: ${name}`)
	}

	if (!Array.isArray(parameters) || parameters.length === 0) {
		throw new Error("At least one parameter is required")
	}

	for (const param of parameters) {
		if (!param.name || typeof param.name !== "string") {
			throw new Error("All parameters must have a name")
		}
		if (!param.type || typeof param.type !== "string") {
			throw new Error("All parameters must have a type")
		}
	}

	if (!returns || typeof returns !== "string") {
		throw new Error("Return type is required")
	}
}

//++ Checks if a string is in camelCase format
function isCamelCase(str: string): boolean {
	if (!/^[a-z]/.test(str)) return false
	if (!/^[a-zA-Z0-9]+$/.test(str)) return false
	if (/[A-Z]{2,}/.test(str)) return false
	return true
}

//++ Generates the function code from configuration
function generateFunctionCode(config: FunctionConfig): string {
	const { name, parameters, returns, description, generic } = config

	if (parameters.length === 1) {
		return generateUnaryFunction(config)
	} else if (parameters.length === 2) {
		return generateBinaryFunction(config)
	} else if (parameters.length === 3) {
		return generateTernaryFunction(config)
	} else {
		return generateMultiParamFunction(config)
	}
}

//++ Generates a unary function (not curried)
function generateUnaryFunction(config: FunctionConfig): string {
	const { name, parameters, returns, description, generic } = config
	const param = parameters[0]
	const genericPart = generic ? `<${generic}>` : ""
	const desc = description || `Brief description of what ${name} does`

	return `//++ ${desc}
export default function ${name}${genericPart}(${param.name}: ${param.type}): ${returns} {
	// TODO: Implement function logic
	throw new Error("Not implemented")
}
`
}

//++ Generates a binary curried function
function generateBinaryFunction(config: FunctionConfig): string {
	const { name, parameters, returns, description, generic, conjunction } = config
	const [param1, param2] = parameters
	const genericPart = generic ? `<${generic}>` : ""
	const desc = description || `Brief description of what ${name} does`
	const innerName = generateInnerFunctionName(name, param1.name, conjunction)

	return `//++ ${desc}
export default function ${name}${genericPart}(${param1.name}: ${param1.type}) {
	return function ${innerName}(${param2.name}: ${param2.type}): ${returns} {
		// TODO: Implement function logic
		throw new Error("Not implemented")
	}
}
`
}

//++ Generates a ternary curried function
function generateTernaryFunction(config: FunctionConfig): string {
	const { name, parameters, returns, description, generic, conjunction } = config
	const [param1, param2, param3] = parameters
	const genericPart = generic ? `<${generic}>` : ""
	const desc = description || `Brief description of what ${name} does`

	const innerName1 = generateInnerFunctionName(name, param1.name, conjunction)
	const innerName2 = `${innerName1}And${capitalize(param2.name)}`

	return `//++ ${desc}
export default function ${name}${genericPart}(${param1.name}: ${param1.type}) {
	return function ${innerName1}(${param2.name}: ${param2.type}) {
		return function ${innerName2}(${param3.name}: ${param3.type}): ${returns} {
			// TODO: Implement function logic
			throw new Error("Not implemented")
		}
	}
}
`
}

//++ Generates a multi-parameter curried function (4+ parameters)
function generateMultiParamFunction(config: FunctionConfig): string {
	const { name, parameters, returns, description, generic, conjunction } = config
	const genericPart = generic ? `<${generic}>` : ""
	const desc = description || `Brief description of what ${name} does`

	let code = `//++ ${desc}\n`
	code += `export default function ${name}${genericPart}(${parameters[0].name}: ${parameters[0].type}) {\n`

	for (let i = 1; i < parameters.length; i++) {
		const indent = "\t".repeat(i)
		const param = parameters[i]
		const accumulatedParams = parameters.slice(0, i)
		const innerName = generateMultiParamInnerName(name, accumulatedParams, conjunction)
		const isLast = i === parameters.length - 1

		if (isLast) {
			code += `${indent}return function ${innerName}(${param.name}: ${param.type}): ${returns} {\n`
			code += `${indent}\t// TODO: Implement function logic\n`
			code += `${indent}\tthrow new Error("Not implemented")\n`
			code += `${indent}}\n`
		} else {
			code += `${indent}return function ${innerName}(${param.name}: ${param.type}) {\n`
		}
	}

	// Close braces
	for (let i = parameters.length - 2; i >= 0; i--) {
		const indent = "\t".repeat(i)
		code += `${indent}}\n`
	}

	return code
}

//++ Generates inner function name for binary/ternary functions
function generateInnerFunctionName(
	baseName: string,
	paramName: string,
	conjunction?: Conjunction,
): string {
	const conj = conjunction || "With"
	const capitalizedParam = capitalize(paramName)
	return `${baseName}${conj}${capitalizedParam}`
}

//++ Generates inner function name for multi-param functions
function generateMultiParamInnerName(
	baseName: string,
	accumulatedParams: ReadonlyArray<Parameter>,
	conjunction?: Conjunction,
): string {
	const conj = conjunction || "With"

	if (accumulatedParams.length === 1) {
		return `${baseName}${conj}${capitalize(accumulatedParams[0].name)}`
	}

	const paramNames = accumulatedParams.map((p) => capitalize(p.name))
	const lastName = paramNames[paramNames.length - 1]
	const previousNames = paramNames.slice(0, -1).join("And")

	return `${baseName}${conj}${previousNames}And${lastName}`
}

//++ Capitalizes the first letter of a string
function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

//++ Generates test code
function generateTestCode(config: FunctionConfig): string {
	const { name, parameters } = config
	const paramCount = parameters.length

	return `import { assertEquals, assertThrows } from "jsr:@std/assert"
import ${name} from "./index.ts"

Deno.test("${name} - basic functionality", () => {
	// TODO: Write test for happy path
	// Example:
	// const result = ${name}(${parameters.map((p) => `/* ${p.name} */`).join(")(")})
	// assertEquals(result, /* expected value */)
	throw new Error("Test not implemented")
})

Deno.test("${name} - edge cases", () => {
	// TODO: Write tests for edge cases
	// - Empty inputs
	// - Null/undefined
	// - Boundary values
	throw new Error("Test not implemented")
})

Deno.test("${name} - error handling", () => {
	// TODO: Write tests for error cases
	// If function returns Result<T,E>, test error paths
	throw new Error("Test not implemented")
})
`
}
