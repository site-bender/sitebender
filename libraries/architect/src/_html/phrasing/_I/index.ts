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
 + HTML i element wrapper for alternate voice/mood/taxonomy
 */
export default function _I(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("i")(role)
	const attributes = {
		..._validateAttributes("i")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "I",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
