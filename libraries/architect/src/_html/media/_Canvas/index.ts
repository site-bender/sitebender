import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		height?: number // Canvas height in pixels
		width?: number // Canvas width in pixels
	}>

/*++
 + HTML canvas element wrapper for bitmap graphics
 */
export default function _Canvas(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("canvas")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("canvas")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("canvas")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "CANVAS",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
