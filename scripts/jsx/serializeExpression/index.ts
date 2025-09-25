import type { SerializedExpr } from "../types/index.ts"

//++ Serializes an expression AST node into a simplified format
export default function serializeExpression(expr: unknown): SerializedExpr {
	const e = expr as Record<string, unknown>
	const t = e?.type as string | undefined

	const isIdentifier = t === "Identifier"
	const isStringLiteral = t === "StringLiteral"
	const isNumericLiteral = t === "NumericLiteral"

	const identifierResult = isIdentifier
		? { type: "Identifier" as const, name: String(e.name ?? "") }
		: null

	const stringResult = isStringLiteral
		? { type: "StringLiteral" as const, value: String(e.value ?? "") }
		: null

	const numericResult = isNumericLiteral
		? { type: "NumericLiteral" as const, value: Number(e.value ?? 0) }
		: null

	return identifierResult || stringResult || numericResult ||
		{ type: "Unsupported" as const, raw: String(t ?? "unknown") }
}
