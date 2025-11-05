import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + HTML div element wrapper for flow content
 */
export default function _Div(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("div")(role)

	/*++
	 + Validate ARIA attributes using whitelist approach
	 */
	const validateAria = _validateAriaAttributes("div")
	const validateAriaForRole = validateAria(role)
	const ariaResult = validateAriaForRole(aria || {})

	const attributes = {
		..._validateAttributes("div")(attrs),
		...roleAttrs,
		...ariaResult.validAttrs,
		...ariaResult.invalidAttrs,
		...ariaResult.errors,
	}

	return {
		_tag: "element" as const,
		tagName: "DIV",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
