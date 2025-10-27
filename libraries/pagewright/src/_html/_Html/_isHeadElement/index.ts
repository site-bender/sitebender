import type { ElementConfig } from "../../../types/index.ts"

import isPlainObject from "@sitebender/toolsmith/predicates/isPlainObject/index.ts"
import isNotNullish from "@sitebender/toolsmith/predicates/isNotNullish/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

/*++
 + Private predicate that checks if a value is a HEAD element
 + Used to filter children and extract HEAD elements
 */
export default function _isHeadElement(
	child: unknown,
): child is ElementConfig {
	if (not(isPlainObject(child))) {
		return false
	}

	if (not(isNotNullish(child))) {
		return false
	}

	if (not("_tag" in child)) {
		return false
	}

	if (not(isEqual("element")(child._tag))) {
		return false
	}

	if (not("tagName" in child)) {
		return false
	}

	return isEqual("HEAD")(child.tagName)
}
