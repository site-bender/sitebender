import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML hgroup element wrapper for heading group
 */
export default function _Hgroup(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("hgroup")(role)
	const attributes = {
		..._validateAttributes("hgroup")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "HGROUP",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
