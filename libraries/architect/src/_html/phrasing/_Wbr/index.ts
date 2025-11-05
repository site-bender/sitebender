import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// No element-specific props (no children for void element)
	}>

/*++
 + HTML wbr element wrapper for line break opportunity
 + Note: Void element (self-closing)
 */
export default function _Wbr(props: Props): VirtualNode {
	const { role, ...attrs } = props
	const roleAttrs = _validateRole("wbr")(role)
	const attributes = {
		..._validateAttributes("wbr")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "WBR",
		attributes,
		children: [],
	}
}
