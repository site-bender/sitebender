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
 + Context-aware heading component that resolves to H1-H6 based on sectioning depth
 + Generates HEADING placeholder that is resolved by _resolveHeadingLevels pass
 + Internal component used by Architect semantic components, not for direct end-user use
 */
export default function _Hn(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props

	/*++
	 + Use h1 role validation as default
	 + Actual heading level will be resolved during post-processing
	 */
	const roleAttrs = _validateRole("h1")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("h1")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("h1")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "HEADING",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
