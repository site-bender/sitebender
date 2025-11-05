import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// No element-specific props
	}>

/*++
 + HTML strong element wrapper for strong importance/urgency/seriousness
 */
export default function _Strong(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("strong")(role)
	const attributes = {
		..._validateAttributes("strong")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "STRONG",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
