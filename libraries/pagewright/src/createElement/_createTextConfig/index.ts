import type { ElementConfig } from "../../types/index.ts"

/*++
 + Creates a text node configuration from a string
 */
export default function _createTextConfig(content: string): ElementConfig {
	return {
		_tag: "text" as const,
		content,
	}
}
