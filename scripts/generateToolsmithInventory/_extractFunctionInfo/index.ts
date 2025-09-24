import type { FunctionInfo } from "../types/index.ts"
import isNullish from "@sitebender/toolsmith/vanilla/validation/isNullish/index.ts"
import _extractFunctionName from "./_extractFunctionName/index.ts"
import _extractSignature from "./_extractSignature/index.ts"
import _isCurriedFunction from "./_isCurriedFunction/index.ts"
import _generateRelativePath from "./_generateRelativePath/index.ts"

/**
 * Extract function information from index.ts file content
 */
export default function _extractFunctionInfo(content: string) {
	return function withFilePath(filePath: string): FunctionInfo | null {
		const functionName = _extractFunctionName(content)

		if (isNullish(functionName)) {
			return null
		}

		const signature = _extractSignature(content)(functionName)
		const curried = _isCurriedFunction(content)
		const path = _generateRelativePath(filePath)

		return {
			signature,
			path,
			curried,
		}
	}
}
