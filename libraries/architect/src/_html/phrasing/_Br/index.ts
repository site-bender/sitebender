import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"

export type Props = BaseProps

/*++
 + HTML br element wrapper for line break
 + Note: Void element (self-closing)
 */
export default function _Br(props: Props): VirtualNode {
	const { role, aria, ...attrs } = props
	const roleAttrs = _validateRole("br")(role)
	// Validate ARIA attributes only if provided
	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("br")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("br")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "BR",
		attributes,
		children: [],
	}
}
