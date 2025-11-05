import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		datetime?: string // Machine-readable date/time
	}>

/*++
 + HTML time element wrapper for dates and times
 */
export default function _Time(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("time")(role)
	const attributes = {
		..._validateAttributes("time")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TIME",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
