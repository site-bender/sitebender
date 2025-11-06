import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML datalist element wrapper for autocomplete options
 */
export default function _Datalist(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("datalist")(role)
	const attributes = {
		..._validateAttributes("datalist")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DATALIST",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
