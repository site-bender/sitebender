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
 + HTML section element wrapper for thematic grouping
 */
export default function _Section(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("section")(role)
	const attributes = {
		..._validateAttributes("section")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SECTION",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
