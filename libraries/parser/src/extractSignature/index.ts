//++ Extracts function signature from a TypeScript function node
import * as typescript from "npm:typescript@5.7.2"
import type { FunctionSignature, ParseError, Result } from "../types/index.ts"
import type { FunctionNode } from "../extractFunctions/index.ts"
import extractParameters from "./extractParameters/index.ts"
import extractReturnType from "./extractReturnType/index.ts"
import extractGenerics from "./extractGenerics/index.ts"
import detectProperties from "./detectProperties/index.ts"

export default function extractSignature(
	sourceFile: typescript.SourceFile,
	checker: typescript.TypeChecker,
) {
	return function (
		functionNode: FunctionNode,
	): Result<FunctionSignature, ParseError> {
		try {
			const node = functionNode.node

			// Get the actual function node (handle different types)
			const funcNode = typescript.isFunctionDeclaration(node)
				? node
				: typescript.isFunctionExpression(node)
				? node
				: typescript.isArrowFunction(node)
				? node
				: null

			if (!funcNode) {
				return {
					ok: false,
					error: {
						type: "ParseError",
						message: "Invalid function node type",
					},
				}
			}

			// Extract all the parts
			const parameters = extractParameters(sourceFile)(checker)(funcNode)
			const returnType = extractReturnType(sourceFile)(checker)(funcNode)
			const generics = extractGenerics(sourceFile)(funcNode)
			const properties = detectProperties(funcNode)

			// Build the signature
			const signature: FunctionSignature = {
				name: functionNode.name,
				filePath: sourceFile.fileName,
				parameters,
				returnType,
				generics: generics.length > 0 ? generics : undefined,
				isAsync: properties.isAsync,
				isGenerator: properties.isGenerator,
				isCurried: properties.isCurried,
				isPure: properties.isPure,
				isExported: functionNode.isExported,
				isDefault: functionNode.isDefault,
			}

			return {
				ok: true,
				value: signature,
			}
		} catch (error) {
			return {
				ok: false,
				error: {
					type: "ParseError",
					message: error instanceof Error
						? error.message
						: "Failed to extract signature",
				},
			}
		}
	}
}

//?? extractSignature(sourceFile, checker)(functionNode) // Returns function signature
