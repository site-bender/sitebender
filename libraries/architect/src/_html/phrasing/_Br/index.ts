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
 + HTML br element wrapper for line break
 + Note: Void element (self-closing)
 */
export default function _Br(props: Props): VirtualNode {
	const { role, ...attrs } = props
	const roleAttrs = _validateRole("br")(role)
	const attributes = {
		..._validateAttributes("br")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "BR",
		attributes,
		children: [],
	}
}
