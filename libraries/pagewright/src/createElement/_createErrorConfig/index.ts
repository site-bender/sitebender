import type { ElementConfig } from "../../../types/index.ts"

/*++
 + Creates an error node configuration
 + Used for graceful degradation when invalid children are encountered
 + Curried for partial application with error code
 */
export default function _createErrorConfig(code: string) {
	return function _createErrorConfigWithCode(message: string) {
		return function _createErrorConfigWithCodeAndMessage(
			received?: unknown,
		): ElementConfig {
			return {
				_tag: "error" as const,
				code,
				message,
				received,
			}
		}
	}
}
