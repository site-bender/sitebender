import type { SerializedExpr } from "../types/index.ts"

//++ Evaluates a serialized expression AST node with a given context
export default function evalExpressionAst(
	ast: SerializedExpr,
	context: Record<string, unknown>,
): unknown {
	const astType = ast.type

	const isIdentifier = astType === "Identifier"
	const isStringLiteral = astType === "StringLiteral"
	const isNumericLiteral = astType === "NumericLiteral"

	const identifierResult = isIdentifier
		? context[(ast as { name: string }).name]
		: null

	const stringResult = isStringLiteral
		? (ast as { value: string }).value
		: null

	const numericResult = isNumericLiteral
		? (ast as { value: number }).value
		: null

	return identifierResult ?? stringResult ?? numericResult ?? ""
}