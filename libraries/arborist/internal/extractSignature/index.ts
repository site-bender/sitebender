//++ Extracts complete signature information from any function node type
import * as typescript from "npm:typescript@5.7.2"

import type { FunctionSignature } from "../types/index.ts"

import detectProperties from "./detectProperties/index.ts"
import extractGenerics from "./extractGenerics/index.ts"
import extractParameters from "./extractParameters/index.ts"
import extractReturnType from "./extractReturnType/index.ts"
import hasDefaultModifier from "./hasDefaultModifier/index.ts"
import hasExportModifier from "./hasExportModifier/index.ts"

export default function extractSignature(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
	sourceFile: typescript.SourceFile,
	filePath: string,
): FunctionSignature {
	// Extract name - different for each node type
	const name = typescript.isFunctionDeclaration(node) ||
			typescript.isMethodDeclaration(node)
		? node.name?.getText(sourceFile) ?? "anonymous"
		: typescript.isFunctionExpression(node) && node.name
		? node.name.getText(sourceFile)
		: "anonymous"

	// Extract all signature components
	const parameters = extractParameters(node, sourceFile)
	const returnType = extractReturnType(node, sourceFile)
	const generics = extractGenerics(node, sourceFile)
	const properties = detectProperties(node, sourceFile)

	// Check export status (only for function declarations)
	const isExported = typescript.isFunctionDeclaration(node)
		? hasExportModifier(node)
		: false

	const isDefault = typescript.isFunctionDeclaration(node)
		? hasDefaultModifier(node)
		: false

	return {
		name,
		filePath,
		parameters,
		returnType,
		generics,
		isAsync: properties.isAsync,
		isGenerator: properties.isGenerator,
		isCurried: properties.isCurried,
		isPure: properties.isPure,
		isExported,
		isDefault,
	}
}
