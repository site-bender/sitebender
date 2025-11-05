import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
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
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("progress")(role)
	const attributes = {
		..._validateAttributes("progress")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "PROGRESS",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
