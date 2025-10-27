import type { ElementConfig } from "../../../types/index.ts"

import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import getTag from "@sitebender/toolsmith/object/getTag/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import { HEAD_ELEMENTS } from "../../constants/index.ts"

/*++
 + Private predicate that checks if an element belongs in BODY
 + Used to separate orphaned children into head vs body content
 + Returns true if element is not tagged as "element" OR is not in HEAD_ELEMENTS
 */
export default function _isBodyContentElement(
	child: ElementConfig,
): boolean {
	const tagResult = getTag(child)
	const tag = getOrElse("")(tagResult)

	const isNotElement = not(isEqual("element")(tag))
	const isNotHeadElement = not(includes(HEAD_ELEMENTS)(child.tagName))

	return or(isNotElement)(isNotHeadElement)
}
