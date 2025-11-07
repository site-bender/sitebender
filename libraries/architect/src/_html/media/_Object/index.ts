import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		data?: string // Resource URL
		form?: string // Associated form ID
		height?: number | string
		name?: string // Object name
		type?: string // MIME type
		width?: number | string
	}>

/*++
 + HTML object element wrapper for embedded external resource
 */
export default function _Object(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("object")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("object")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("object")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "OBJECT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
