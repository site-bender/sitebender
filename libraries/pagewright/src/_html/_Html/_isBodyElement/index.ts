import type { ElementConfig } from "../../../types/index.ts"

import isPlainObject from "@sitebender/toolsmith/predicates/isPlainObject/index.ts"
import isNotNullish from "@sitebender/toolsmith/predicates/isNotNullish/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import getTag from "@sitebender/toolsmith/object/getTag/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

/*++
 + Private predicate that checks if a value is a BODY element
 + Used to filter children and extract BODY elements
 */
export default function _isBodyElement(
	child: unknown,
): child is ElementConfig {
	if (not(isPlainObject(child))) {
		return false
	}

	if (not(isNotNullish(child))) {
		return false
	}

	const tagResult = getTag(child)
	const tag = getOrElse("")(tagResult)

	if (not(isEqual("element")(tag))) {
		return false
	}

	if (not("tagName" in child)) {
		return false
	}

	return isEqual("BODY")(child.tagName)
}
