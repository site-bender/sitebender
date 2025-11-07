import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "../types/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAriaAttributes from "../_validateAriaAttributes/index.ts"
import _validateAttributes from "../_validateAttributes/index.ts"
import _validateStringAttribute from "../_validateStringAttribute/index.ts"

export type Props = BaseProps

/*++
 + Html component - Root HTML element wrapper
 */
export default function _Html(props: Props): VirtualNode {
	const { children = [], xmlns, aria, role, ...attrs } = props

	/*++
	 + Validate ARIA attributes only if provided
	 */
	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("html")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("html")(attrs),
		..._validateStringAttribute("xmlns")({ xmlns }),
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "HTML",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
