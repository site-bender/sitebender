import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		for?: string // Space-separated list of IDs
		form?: string // ID of associated form
		name?: string // Name for output
	}>

/*++
 + HTML output element wrapper for calculation results
 */
export default function _Output(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("output")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("output")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("output")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "OUTPUT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
