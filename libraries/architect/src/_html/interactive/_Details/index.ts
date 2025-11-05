import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		open?: boolean // Whether details are visible
	}>

/*++
 + HTML details element wrapper for disclosure widget
 */
export default function _Details(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("details")(role)
	const attributes = {
		..._validateAttributes("details")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DETAILS",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
