import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		span?: number // Number of columns spanned
	}>

/*++
 + HTML col element wrapper for table column
 + Note: Void element (self-closing)
 */
export default function _Col(props: Props): VirtualNode {
	const { role, aria, ...attrs } = props
	const roleAttrs = _validateRole("col")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("col")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("col")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "COL",
		attributes,
		children: [],
	}
}
