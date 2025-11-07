import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		height?: number // For picture element
		media?: string // Media query
		sizes?: string // Image sizes
		src?: string // Media URL
		srcset?: string // Image source set
		type?: string // MIME type
		width?: number // For picture element
	}>

/*++
 + HTML source element wrapper for media source
 + Note: Void element (self-closing)
 */
export default function _Source(props: Props): VirtualNode {
	const { role, aria, ...attrs } = props
	const roleAttrs = _validateRole("source")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("source")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("source")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SOURCE",
		attributes,
		children: [],
	}
}
