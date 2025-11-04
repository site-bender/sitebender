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
 + HTML header element wrapper for page or section header
 */
export default function _Header(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("header")(role)
	const attributes = {
		..._validateAttributes("header")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "HEADER",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
