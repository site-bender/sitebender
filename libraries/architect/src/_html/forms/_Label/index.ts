import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateLabelRole from "./_validateLabelRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		htmlFor?: string
	}>

/*++
 + HTML label element wrapper for form control labels
 + Role validation is conditional on for attribute
 +
 + Note: In JSX, the HTML 'for' attribute is 'htmlFor' to avoid conflict with
 + JavaScript's for keyword. This component accepts htmlFor and converts it.
 */
export default function _Label(props: Props): VirtualNode {
	const { children = [], htmlFor, role, aria, ...attrs } = props
	const roleAttrs = _validateLabelRole(isDefined(htmlFor))(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("label")(role)(aria)
		: {}

	// Convert htmlFor to for attribute
	const attributes = {
		..._validateAttributes("label")({ ...attrs }),
		...roleAttrs,
		...ariaAttrs,
		...(isDefined(htmlFor) ? { for: htmlFor } : {}),
	}

	return {
		_tag: "element" as const,
		tagName: "LABEL",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
