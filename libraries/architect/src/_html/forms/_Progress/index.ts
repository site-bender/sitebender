import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		value?: number // Current progress value
		max?: number // Maximum value (default 1.0)
	}>

/*++
 + HTML progress element wrapper for progress indicator
 */
export default function _Progress(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("progress")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("progress")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("progress")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "PROGRESS",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
