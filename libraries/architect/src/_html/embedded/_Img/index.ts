import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateImgRole from "./_validateImgRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		alt?: string
		src?: string
		srcset?: string
		sizes?: string
		crossorigin?: string
		usemap?: string
		ismap?: ""
		width?: string
		height?: string
		referrerpolicy?: string
		decoding?: string
		loading?: string
		fetchpriority?: string
	}>

/*++
 + HTML img element wrapper for images
 + Role validation is conditional on alt attribute
 */
export default function _Img(props: Props): VirtualNode {
	const { children = [], alt, role, aria, ...attrs } = props

	const hasEmptyAlt = and(isDefined(alt))(
		and(isString(alt))(isEqual("")(alt)),
	)
	const hasAccessibleName = and(isDefined(alt))(
		and(isString(alt))(not(isEqual("")(alt))),
	)

	const roleAttrs = _validateImgRole(hasAccessibleName, hasEmptyAlt)(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("img")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("img")({ ...attrs, alt }),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "IMG",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
