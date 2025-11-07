import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		height?: number | string
		src?: string // Embedded resource URL
		type?: string // MIME type
		width?: number | string
	}>

/*++
 + HTML embed element wrapper for embedded external content
 + Note: Void element (self-closing)
 */
export default function _Embed(props: Props): VirtualNode {
	const { role, aria, ...attrs } = props
	const roleAttrs = _validateRole("embed")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("embed")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("embed")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "EMBED",
		attributes,
		children: [],
	}
}
