import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML legend element wrapper for fieldset caption
 */
export default function _Legend(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("legend")(role)
	const attributes = {
		..._validateAttributes("legend")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "LEGEND",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
