import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML search element wrapper for search section
 */
export default function _Search(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("search")(role)
	const attributes = {
		..._validateAttributes("search")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SEARCH",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
