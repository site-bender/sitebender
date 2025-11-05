import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		title?: string // Expansion of abbreviation
	}>

/*++
 + HTML abbr element wrapper for abbreviations
 */
export default function _Abbr(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("abbr")(role)
	const attributes = {
		..._validateAttributes("abbr")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "ABBR",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
