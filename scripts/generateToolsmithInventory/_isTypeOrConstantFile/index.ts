import or from "@sitebender/toolsmith/vanilla/logic/or/index.ts"
import includes from "@sitebender/toolsmith/vanilla/string/includes/index.ts"

/**
 * Check if file path represents a type or constant file
 */
export default function _isTypeOrConstantFile(filePath: string): boolean {
	const isTypesFile = includes("/types/index.ts")(filePath)
	const isConstantsFile = includes("/constants/index.ts")(filePath)

	return or(isTypesFile)(isConstantsFile)
}
