import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		disabled?: boolean
		label?: string // Human-readable label
		selected?: boolean
		value?: string
	}>

/*++
 + HTML option element wrapper for select option
 */
export default function _Option(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("option")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("option")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("option")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "OPTION",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
