import type { ElementConfig } from "../../../types/index.ts"

import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import getTag from "@sitebender/toolsmith/object/getTag/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import { HEAD_ELEMENTS } from "../../constants/index.ts"

/*++
 + Private predicate that checks if an element belongs in HEAD
 + Used to separate orphaned children into head vs body content
 */
export default function _isHeadContentElement(
	child: ElementConfig,
): boolean {
	const tagResult = getTag(child)
	const tag = getOrElse("")(tagResult)

	const isElement = isEqual("element")(tag)
	const isHeadElement = includes(HEAD_ELEMENTS)(child.tagName)

	return and(isElement)(isHeadElement)
}
