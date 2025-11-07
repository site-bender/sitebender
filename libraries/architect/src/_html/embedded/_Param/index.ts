import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		name?: string // Parameter name
		value?: string // Parameter value
	}>

/*++
 + HTML param element wrapper for object parameters
 + Note: Void element (self-closing)
 */
export default function _Param(props: Props): VirtualNode {
	const { role, aria, ...attrs } = props
	const roleAttrs = _validateRole("param")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("param")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("param")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "PARAM",
		attributes,
		children: [],
	}
}
