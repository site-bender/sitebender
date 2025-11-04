import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + HTML article element wrapper for self-contained content
 */
export default function _Article(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("article")(role)
	const attributes = {
		..._validateAttributes("article")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "ARTICLE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
