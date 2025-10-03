import type {
	CompilationMetadata,
	ConstantMetadata,
	EnrichedAstNode,
	FunctionMetadata,
	VariableMetadata,
} from "../types/index.ts"

import { MATHEMATICAL_CONSTANTS } from "../constants/index.ts"

//++ Collects metadata from enriched AST (variables, constants, functions)
export default function collectMetadata(
	ast: EnrichedAstNode,
	_sourceFormula: string,
): CompilationMetadata {
	const variables = new Map<string, VariableMetadata>()
	const constants = new Map<string, ConstantMetadata>()
	const functions = new Map<string, FunctionMetadata>()

	function walk(node: EnrichedAstNode): void {
		if (node._tag === "variable") {
			if (MATHEMATICAL_CONSTANTS.has(node.name)) {
				const constantInfo = MATHEMATICAL_CONSTANTS.get(node.name)!

				if (constants.has(node.name)) {
					return
				}

				constants.set(node.name, constantInfo)
			} else {
				if (variables.has(node.name)) {
					const existing = variables.get(node.name)!
					variables.set(node.name, {
						...existing,
						positions: Object.freeze([...existing.positions, node.position]),
					})
				} else {
					variables.set(node.name, {
						name: node.name,
						datatype: node.datatype,
						positions: Object.freeze([node.position]),
					})
				}
			}
			return
		}

		if (node._tag === "functionCall") {
			if (functions.has(node.name)) {
				return
			}

			functions.set(node.name, {
				name: node.name,
				arity: node.arguments.length,
				returnDatatype: node.datatype,
			})

			node.arguments.forEach(walk)
			return
		}

		if (node._tag === "binaryOperator") {
			walk(node.left)
			walk(node.right)
			return
		}

		if (node._tag === "unaryOperator") {
			walk(node.operand)
			return
		}

		if (node._tag === "group") {
			walk(node.expression)
			return
		}
	}

	walk(ast)

	return Object.freeze({
		variables: Object.freeze(variables),
		constants: Object.freeze(constants),
		functions: Object.freeze(functions),
		outputDatatype: ast.datatype,
	})
}
