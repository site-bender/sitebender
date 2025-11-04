import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + HTML p element wrapper for paragraphs
 */
export default function _P(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("p")(role)
	const attributes = {
		..._validateAttributes("p")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "P",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
