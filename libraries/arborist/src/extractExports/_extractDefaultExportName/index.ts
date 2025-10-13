import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

export default function _extractDefaultExportName(
	decl: Record<string, unknown> | undefined
): string {
	if (!decl) {
		return "default"
	}

	const declType = decl.type as string
	const isFunctionType = or(
		isEqual(declType)("FunctionDeclaration")
	)(isEqual(declType)("FunctionExpression"))

	if (!isFunctionType) {
		return "default"
	}

	const ident = decl.identifier as Record<string, unknown> | undefined
	return ident ? (ident.value as string) : "default"
}
