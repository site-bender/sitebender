import and from "@sitebender/toolsmith/vanilla/logic/and/index.ts"
import or from "@sitebender/toolsmith/vanilla/logic/or/index.ts"
import concat from "@sitebender/toolsmith/vanilla/string/concat/index.ts"
import endsWith from "@sitebender/toolsmith/vanilla/string/endsWith/index.ts"
import length from "@sitebender/toolsmith/vanilla/string/length/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"
import startsWith from "@sitebender/toolsmith/vanilla/string/startsWith/index.ts"
import substring from "@sitebender/toolsmith/vanilla/string/substring/index.ts"

/**
 * Join path segments with forward slash, normalizing multiple slashes to single slash
 */
export default function _joinPath(base: string) {
	return function withSegment(segment: string): string {
		// Remove trailing slashes from base (keep single if exists)
		const normalizedBase = replace(/\/+$/)("")(base)
		// Remove leading slashes from segment (keep single if exists)
		const normalizedSegment = replace(/^\/+/)("")(segment)

		// Handle empty cases
		if (length(normalizedBase) === 0 && length(normalizedSegment) === 0) {
			return "/"
		}

		if (length(normalizedBase) === 0) {
			return concat("/")(normalizedSegment)
		}

		if (length(normalizedSegment) === 0) {
			return concat(normalizedBase)("/")
		}

		// Join with single slash
		return concat(concat(normalizedBase)("/"))(normalizedSegment)
	}
}
