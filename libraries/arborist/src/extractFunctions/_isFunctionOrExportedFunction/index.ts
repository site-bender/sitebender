//++ Checks if a node is a function declaration or exported function
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

export default function _isFunctionOrExportedFunction(node: unknown): boolean {
	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	// Direct function declarations
	if (isEqual(nodeType)("FunctionDeclaration")) {
		return true
	}

	// Export declarations that might wrap functions
	if (isEqual(nodeType)("ExportDeclaration")) {
		const decl = nodeObj.declaration as Record<string, unknown> | undefined
		return isEqual(decl?.type)("FunctionDeclaration")
	}

	// Default export declarations that might wrap functions
	// Note: SWC uses FunctionExpression for "export default function name()"
	if (isEqual(nodeType)("ExportDefaultDeclaration")) {
		const decl = nodeObj.decl as Record<string, unknown> | undefined
		return isEqual(decl?.type)("FunctionDeclaration") ||
			isEqual(decl?.type)("FunctionExpression")
	}

	return false
}
