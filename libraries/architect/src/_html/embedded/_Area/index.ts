import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateAreaRole from "./_validateAreaRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		alt?: string
		coords?: string
		shape?: string
		href?: string
		target?: string
		download?: string
		ping?: string
		rel?: string
		referrerpolicy?: string
	}>

/*++
 + HTML area element wrapper for image map areas
 + Role validation is conditional on href attribute
 */
export default function _Area(props: Props): VirtualNode {
	const { children = [], href, role, ...attrs } = props
	const roleAttrs = _validateAreaRole(isDefined(href))(role)
	const attributes = {
		..._validateAttributes("area")({ ...attrs, href }),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "AREA",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
