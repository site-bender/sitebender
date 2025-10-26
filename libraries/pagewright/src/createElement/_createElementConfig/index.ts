import type { ElementConfig } from "../../types/index.ts"

import toUpper from "@sitebender/toolsmith/string/toCase/toUpper/index.ts"

/*++
 + Creates an element configuration from tagName, attributes, and children
 + Tag name is uppercased per HTML spec
 */
export default function _createElementConfig(tagName: string) {
	return function _createElementConfigWithTagName(
		attributes: Readonly<Record<string, string>>,
	) {
		return function _createElementConfigWithTagNameAndAttributes(
			children: ReadonlyArray<ElementConfig>,
		): ElementConfig {
			return {
				_tag: "element" as const,
				tagName: toUpper(tagName),
				attributes,
				children,
			}
		}
	}
}
