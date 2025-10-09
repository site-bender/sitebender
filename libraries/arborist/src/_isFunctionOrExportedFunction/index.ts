//++ Checks if a node is a function declaration or exported function
export default function _isFunctionOrExportedFunction(node: unknown): boolean {
	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	// Direct function declarations
	if (nodeType === "FunctionDeclaration") {
		return true
	}

	// Export declarations that might wrap functions
	if (nodeType === "ExportDeclaration") {
		const decl = nodeObj.declaration as Record<string, unknown> | undefined
		return decl?.type === "FunctionDeclaration"
	}

	// Default export declarations that might wrap functions
	// Note: SWC uses FunctionExpression for "export default function name()"
	if (nodeType === "ExportDefaultDeclaration") {
		const decl = nodeObj.decl as Record<string, unknown> | undefined
		return decl?.type === "FunctionDeclaration" ||
			decl?.type === "FunctionExpression"
	}

	return false
}
