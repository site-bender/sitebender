//++ Checks if a node is a class declaration or exported class
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

export default function _isClassOrExportedClass(node: Serializable): boolean {
	const nodeObj = node as Record<string, Serializable>
	const nodeType = nodeObj.type as string

	// Direct class declarations
	if (isEqual(nodeType)("ClassDeclaration")) {
		return true
	}

	// Export declarations that might wrap classes
	if (isEqual(nodeType)("ExportDeclaration")) {
		const decl = nodeObj.declaration as Record<string, Serializable> | undefined
		return isEqual(decl?.type)("ClassDeclaration")
	}

	// Default export declarations that might wrap classes
	if (isEqual(nodeType)("ExportDefaultDeclaration")) {
		const decl = nodeObj.decl as Record<string, Serializable> | undefined
		return isEqual(decl?.type)("ClassDeclaration") ||
			isEqual(decl?.type)("ClassExpression")
	}

	return false
}
