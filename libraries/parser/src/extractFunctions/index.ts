//++ Extracts all function declarations from a TypeScript source file
import * as typescript from "npm:typescript@5.7.2"
import extractDefault from "./extractDefault/index.ts"
import extractNamed from "./extractNamed/index.ts"
import extractAll from "./extractAll/index.ts"

export type FunctionNode = {
	readonly name: string
	readonly node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
	readonly isDefault: boolean
	readonly isExported: boolean
	readonly startPos: number
	readonly endPos: number
}

export default function extractFunctions(
	sourceFile: typescript.SourceFile,
): Array<FunctionNode> {
	const allFunctions = extractAll(sourceFile)
	const defaultFunction = extractDefault(sourceFile)
	const namedFunctions = extractNamed(sourceFile)

	// Combine and deduplicate
	const functionMap = new Map<string, FunctionNode>()

	// Add all functions first
	for (const func of allFunctions) {
		const key = `${func.name}-${func.startPos}`
		functionMap.set(key, func)
	}

	// Mark default export
	if (defaultFunction) {
		const key = `${defaultFunction.name}-${defaultFunction.startPos}`
		const existing = functionMap.get(key)
		if (existing) {
			functionMap.set(key, { ...existing, isDefault: true })
		}
	}

	// Mark named exports
	for (const func of namedFunctions) {
		const key = `${func.name}-${func.startPos}`
		const existing = functionMap.get(key)
		if (existing) {
			functionMap.set(key, { ...existing, isExported: true })
		}
	}

	return Array.from(functionMap.values())
}

//?? extractFunctions(sourceFile) // Returns all functions with export info
//?? extractFunctions(sourceFile).filter(f => f.isDefault) // Get default export function
