import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
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
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("article")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("article")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("article")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "ARTICLE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
