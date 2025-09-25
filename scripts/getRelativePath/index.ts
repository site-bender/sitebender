import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import fromFunction from "@sitebender/toolsmith/vanilla/array/from/index.ts"
import fromIndex from "@sitebender/toolsmith/vanilla/array/fromIndex/index.ts"
import join from "@sitebender/toolsmith/vanilla/array/join/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import reject from "@sitebender/toolsmith/vanilla/array/reject/index.ts"
import max from "@sitebender/toolsmith/vanilla/math/max/index.ts"
import contains from "@sitebender/toolsmith/vanilla/string/contains/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import isEmpty from "@sitebender/toolsmith/vanilla/validation/isEmpty/index.ts"
import isUnequal from "@sitebender/toolsmith/vanilla/validation/isUnequal/index.ts"

import removeMatchingSegments from "./removeMatchingSegments/index.ts"

export type Paths = { from: Array<string>; to: Array<string> }

//++ Calculates a relative path from one file to another
export default function getRelativePath(fromPath: string) {
	return function getRelativePathInner(toPath: string): string {
		const splitOnSlash = split("/")
		// Normalize paths by prepending root/ and collapsing any //
		const normalizeWithRoot = (path: string) =>
			replace("//")("/")("root/" + path)
		const fromSegments = splitOnSlash(normalizeWithRoot(fromPath))
		const toSegments = splitOnSlash(normalizeWithRoot(toPath))

		// Find the longer of the two arrays to iterate through
		const longerLength = max(length(fromSegments))(length(toSegments))

		// Use reduce to remove common ancestor segments
		const { from, to } = reduce<
			number,
			Paths
		>(removeMatchingSegments)({
			from: fromSegments,
			to: toSegments,
		})(fromIndex(longerLength))

		// Strip any file (segment with extension) from the from path
		const fromWithoutFile = reject(contains("."))(from)

		// If from has no directories left, we're already in the right place
		if (isEmpty(fromWithoutFile)) {
			// If to is just a filename (no directories), return it directly
			// Otherwise prepend "./" for nested directories
			const toWithoutFile = reject(contains("."))(to)
			return isEmpty(toWithoutFile) ? join("/")(to) : "./" + join("/")(to)
		}

		// Count the number of directory segments we need to go up
		const ancestorCount = length(fromWithoutFile)

		// Create as many "../" strings as there are directory segments
		const upSegments = fromFunction(ancestorCount)(() => "..")

		// Combine with the to path and join
		return join("/")([...upSegments, ...to])
	}
}
