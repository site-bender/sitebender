import type { FileStats, PerFileAnalysis } from "../../types/index.ts"

import map from "@sitebender/toolkit/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"
import sort from "@sitebender/toolkit/vanilla/array/sort/index.ts"
import length from "@sitebender/toolkit/vanilla/array/length/index.ts"
import squareRoot from "@sitebender/toolkit/vanilla/math/squareRoot/index.ts"

import accumulateLongestFile from "./accumulateLongestFile/index.ts"
import accumulateVariance from "./accumulateVariance/index.ts"
import extractLineCount from "./extractLineCount/index.ts"
import compareAscending from "./compareAscending/index.ts"

//++ Computes statistical analysis of file metrics including mean, median, and standard deviation of line counts
export default function computeFileStats(files: PerFileAnalysis[]): FileStats {
	if (length(files) === 0) {
		return {
			longestFile: { path: "<none>", lines: 0 },
			mean: 0,
			median: 0,
			stdDev: 0,
		}
	}

	const result = reduce(accumulateLongestFile)({ total: 0, longest: files[0] })(files)

	const total = result.total
	const longest = result.longest
	const mean = total / length(files)
	const lineCounts = map(extractLineCount)(files)
	const sorted = sort(compareAscending)(lineCounts)
	const sortedLength = length(sorted)

	const median = sortedLength % 2
		? sorted[(sortedLength - 1) / 2]
		: (sorted[sortedLength / 2 - 1] + sorted[sortedLength / 2]) / 2

	const variance = reduce(accumulateVariance(mean))(0)(sorted) / sortedLength
	const stdDev = squareRoot(variance)

	return {
		longestFile: { path: longest.pathRel, lines: longest.lines },
		mean,
		median,
		stdDev,
	}
}
