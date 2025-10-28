import type { VirtualNode } from "../../types/index.ts"

/*++
 + Creates a comment node configuration from a string
 */
export default function _createCommentConfig(content: string): VirtualNode {
	return {
		_tag: "comment" as const,
		content,
	}
}
