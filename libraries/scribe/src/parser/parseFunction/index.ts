import type {
	ASTNode,
	FunctionSignature,
	ParseError,
	Result,
} from "../../types/index.ts"

/**
 * Extracts function information from an AST node
 */
export default function parseFunction(
	node: ASTNode,
	source: string,
): Result<FunctionSignature, ParseError> {
	try {
		if (
			node.kind !== "FunctionDeclaration" && node.kind !== "ArrowFunction"
		) {
			return {
				ok: false,
				error: {
					message: `Expected function node, got ${node.kind}`,
				},
			}
		}

		// Extract function source from positions
		const functionSource = source.slice(node.pos, node.end)

		// Extract function name
		const name = extractName(node, functionSource)

		// Extract parameters
		const parameters = extractParameters(functionSource)

		// Extract return type
		const returnType = extractReturnType(functionSource)

		// Check modifiers
		const isAsync = functionSource.includes("async")
		const isGenerator = functionSource.includes("function*")
		const isExported = Boolean(node.isExported)
		const isDefault = Boolean(node.isDefault)

		// Extract generics
		const generics = extractGenerics(functionSource)

		return {
			ok: true,
			value: {
				name,
				parameters,
				returnType,
				generics: generics.length > 0 ? generics : undefined,
				isAsync,
				isGenerator,
				isExported,
				isDefault,
			},
		}
	} catch (error) {
		return {
			ok: false,
			error: {
				message: error instanceof Error
					? error.message
					: "Failed to parse function",
			},
		}
	}
}

/**
 * Extracts function name from node and source
 */
function extractName(node: ASTNode, source: string): string {
	if (node.name) {
		return String(node.name)
	}

	// Try to extract from source
	const nameMatch = source.match(/function\s+(\w+)/) ||
		source.match(/(?:const|let|var)\s+(\w+)/)

	return nameMatch ? nameMatch[1] : "anonymous"
}

/**
 * Extracts parameters from function source
 */
function extractParameters(
	source: string,
): Array<{ name: string; type: string; optional: boolean }> {
	const parameters: Array<{ name: string; type: string; optional: boolean }> =
		[]

	// Find parameter list
	const paramMatch = source.match(/\(([^)]*)\)/)
	if (!paramMatch || !paramMatch[1]) {
		return parameters
	}

	// Parse individual parameters
	const paramList = paramMatch[1].split(",").map((p) => p.trim())

	for (const param of paramList) {
		if (!param) continue

		// Check for optional parameter
		const optional = param.includes("?")

		// Extract name and type
		const typeMatch = param.match(/(\w+)\s*\??\s*:\s*(.+)/)
		if (typeMatch) {
			parameters.push({
				name: typeMatch[1],
				type: typeMatch[2].trim(),
				optional,
			})
		} else {
			// No type annotation
			const nameMatch = param.match(/(\w+)/)
			if (nameMatch) {
				parameters.push({
					name: nameMatch[1],
					type: "any",
					optional,
				})
			}
		}
	}

	return parameters
}

/**
 * Extracts return type from function source
 */
function extractReturnType(source: string): string {
	// Look for explicit return type annotation
	const returnMatch = source.match(/\)\s*:\s*([^{=]+)/)
	if (returnMatch) {
		return returnMatch[1].trim()
	}

	// Check if it's a simple arrow function with implicit return
	if (source.includes("=>") && !source.includes("{")) {
		return "inferred"
	}

	return "void"
}

/**
 * Extracts generic parameters from function source
 */
function extractGenerics(
	source: string,
): Array<{ name: string; constraint?: string }> {
	const generics: Array<{ name: string; constraint?: string }> = []

	// Look for generic parameters
	const genericMatch = source.match(/<([^>]+)>/)
	if (!genericMatch) {
		return generics
	}

	// Parse individual generics
	const genericList = genericMatch[1].split(",").map((g) => g.trim())

	for (const generic of genericList) {
		// Check for constraint
		const constraintMatch = generic.match(/(\w+)\s+extends\s+(.+)/)
		if (constraintMatch) {
			generics.push({
				name: constraintMatch[1],
				constraint: constraintMatch[2].trim(),
			})
		} else {
			// No constraint
			const nameMatch = generic.match(/(\w+)/)
			if (nameMatch) {
				generics.push({
					name: nameMatch[1],
				})
			}
		}
	}

	return generics
}
