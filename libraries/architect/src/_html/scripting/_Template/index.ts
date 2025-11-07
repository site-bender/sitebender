import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		shadowrootmode?: "open" | "closed"
	}>

/*++
 + HTML template element wrapper for HTML fragments
 */
export default function _Template(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("template")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("template")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("template")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TEMPLATE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
