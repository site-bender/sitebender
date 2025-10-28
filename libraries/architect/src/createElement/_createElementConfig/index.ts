import type { VirtualNode } from "../../types/index.ts"

import toUpper from "@sitebender/toolsmith/string/toCase/toUpper/index.ts"

/*++
 + Creates an element configuration from tagName, attributes, and children
 + Tag name is uppercased per HTML spec
 */
export default function _createVirtualNode(tagName: string) {
	return function _createVirtualNodeWithTagName(
		attributes: Readonly<Record<string, string>>,
	) {
		return function _createVirtualNodeWithTagNameAndAttributes(
			children: ReadonlyArray<VirtualNode>,
		): VirtualNode {
			return {
				_tag: "element" as const,
				tagName: toUpper(tagName),
				attributes,
				children,
			}
		}
	}
}
