import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "../types/index.ts"
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
	 + Validate ARIA attributes using whitelist approach
	 */
	const validateAria = _validateAriaAttributes("html")
	const validateAriaForRole = validateAria(role)
	const ariaResult = validateAriaForRole(aria || {})

	const attributes = {
		..._validateAttributes("html")(attrs),
		..._validateStringAttribute("xmlns")({ xmlns }),
		...ariaResult.validAttrs,
		...ariaResult.invalidAttrs,
		...ariaResult.errors,
	}

	return {
		_tag: "element" as const,
		tagName: "HTML",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
