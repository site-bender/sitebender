import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		span?: number // Number of columns spanned
	}>

/*++
 + HTML colgroup element wrapper for table column group
 */
export default function _Colgroup(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("colgroup")(role)
	const attributes = {
		..._validateAttributes("colgroup")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "COLGROUP",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
