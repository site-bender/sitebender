import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import indexOf from "@sitebender/toolsmith/vanilla/array/indexOf/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import and from "@sitebender/toolsmith/vanilla/logic/and/index.ts"
import increment from "@sitebender/toolsmith/vanilla/math/increment/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import gte from "@sitebender/toolsmith/vanilla/validation/gte/index.ts"
import isNullish from "@sitebender/toolsmith/vanilla/validation/isNullish/index.ts"
import lt from "@sitebender/toolsmith/vanilla/validation/lt/index.ts"

/**
 * Get category from file path
 */
export default function _getCategoryFromPath(filePath: string): string {
	const parts = split("/")(filePath)
	const vanillaIndex = indexOf("vanilla")(parts)

	if (isNullish(vanillaIndex) || vanillaIndex < 0) {
		return "other"
	}

	const nextIndex = increment(vanillaIndex)
	const partsLength = length(parts)

	const isValidIndex = and(gte(0)(vanillaIndex))(lt(partsLength)(nextIndex))

	return isValidIndex ? at(nextIndex)(parts) || "other" : "other"
}
