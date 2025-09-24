import type { FunctionSignature } from "../../types/index.ts"

/**
 * Formats a function signature for documentation
 */
export default function extractSignature(signature: FunctionSignature): string {
	const { name, parameters, returnType, generics, isAsync, isGenerator } =
		signature

	// Build modifiers
	const modifiers = []
	if (isAsync) modifiers.push("async")
	if (isGenerator) modifiers.push("*")

	// Build generic string
	const genericString = generics && generics.length > 0
		? `<${generics.map(formatGeneric).join(", ")}>`
		: ""

	// Build parameter string
	const paramString = parameters.map(formatParameter).join(", ")

	// Check if function is curried
	const isCurried = returnType.includes("=>")

	if (isCurried) {
		// Format curried function signature
		return formatCurriedSignature(
			name,
			parameters,
			returnType,
			genericString,
		)
	}

	// Format standard function signature
	const prefix = modifiers.length > 0 ? modifiers.join(" ") + " " : ""
	return `${prefix}${name}${genericString}(${paramString}): ${returnType}`
}

/**
 * Formats a generic parameter
 */
function formatGeneric(generic: { name: string; constraint?: string }): string {
	if (generic.constraint) {
		return `${generic.name} extends ${generic.constraint}`
	}
	return generic.name
}

/**
 * Formats a function parameter
 */
function formatParameter(
	param: { name: string; type: string; optional: boolean },
): string {
	const optionalMarker = param.optional ? "?" : ""
	return `${param.name}${optionalMarker}: ${param.type}`
}

/**
 * Formats a curried function signature
 */
function formatCurriedSignature(
	name: string,
	parameters: Array<{ name: string; type: string; optional: boolean }>,
	returnType: string,
	genericString: string,
): string {
	// For curried functions, show the chain
	if (parameters.length === 1) {
		return `${name}${genericString}(${
			formatParameter(parameters[0])
		}) => ${returnType}`
	}

	// Multiple parameters - show as curried chain
	const firstParam = formatParameter(parameters[0])
	const restSignature = returnType

	return `${name}${genericString}(${firstParam}) => ${restSignature}`
}
