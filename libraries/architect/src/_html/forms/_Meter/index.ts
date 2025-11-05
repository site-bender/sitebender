import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		value?: number // Current value
		min?: number // Minimum value (default 0)
		max?: number // Maximum value (default 1)
		low?: number // Low threshold
		high?: number // High threshold
		optimum?: number // Optimal value
	}>

/*++
 + HTML meter element wrapper for scalar measurement
 */
export default function _Meter(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("meter")(role)
	const attributes = {
		..._validateAttributes("meter")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "METER",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
