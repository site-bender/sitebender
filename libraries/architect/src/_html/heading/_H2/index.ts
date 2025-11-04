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
 + HTML h2 element wrapper for section headings
 */
export default function _H2(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("h2")(role)
	const attributes = {
		..._validateAttributes("h2")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "H2",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
