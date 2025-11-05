import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// No element-specific props  (no children for void element)
	}>

/*++
 + HTML hr element wrapper for thematic break
 + Note: Void element (self-closing)
 */
export default function _Hr(props: Props): VirtualNode {
	const { role, ...attrs } = props
	const roleAttrs = _validateRole("hr")(role)
	const attributes = {
		..._validateAttributes("hr")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "HR",
		attributes,
		children: [],
	}
}
