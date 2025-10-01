import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a TypeScript syntax kind is a primitive keyword
export default function isPrimitiveKeyword(
	kind: typescript.SyntaxKind,
): boolean {
	return kind === typescript.SyntaxKind.StringKeyword ||
		kind === typescript.SyntaxKind.NumberKeyword ||
		kind === typescript.SyntaxKind.BooleanKeyword ||
		kind === typescript.SyntaxKind.SymbolKeyword ||
		kind === typescript.SyntaxKind.BigIntKeyword
}
