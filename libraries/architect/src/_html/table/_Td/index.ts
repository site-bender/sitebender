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
		headers?: string // Space-separated list of header cell IDs
	}>

/*++
 + HTML td element wrapper for table data cell
 */
export default function _Td(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("td")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("td")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("td")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TD",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
