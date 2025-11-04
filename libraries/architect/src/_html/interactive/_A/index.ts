import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateARole from "./_validateARole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + HTML a element wrapper for hyperlinks
 + Role validation is conditional on href attribute
 */
export default function _A(props: Props): VirtualNode {
	const { children = [], href, role, ...attrs } = props
	const roleAttrs = _validateARole(isDefined(href))(role)
	const attributes = {
		..._validateAttributes("a")({ ...attrs, href }),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "A",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
