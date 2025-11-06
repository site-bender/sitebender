import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		colspan?: number
		rowspan?: number
		scope?: "row" | "col" | "rowgroup" | "colgroup"
		abbr?: string // Abbreviated description
	}>

/*++
 + HTML th element wrapper for table header cell
 */
export default function _Th(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("th")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("th")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("th")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TH",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
