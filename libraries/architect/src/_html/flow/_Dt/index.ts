import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML dt element wrapper for description list term
 */
export default function _Dt(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("dt")(role)
	const attributes = {
		..._validateAttributes("dt")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
