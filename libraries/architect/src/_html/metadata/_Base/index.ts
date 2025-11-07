import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		href?: string // Base URL
		target?: string // Default target for links
	}>

/*++
 + HTML base element wrapper for document base URL
 + Note: Void element (self-closing)
 */
export default function _Base(props: Props): VirtualNode {
	const { role, aria, ...attrs } = props
	const roleAttrs = _validateRole("base")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("base")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("base")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "BASE",
		attributes,
		children: [],
	}
}
