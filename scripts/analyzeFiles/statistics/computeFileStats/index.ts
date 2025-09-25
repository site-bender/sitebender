import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import sort from "@sitebender/toolsmith/vanilla/array/sort/index.ts"

import type { FileStats, PerFileAnalysis } from "../../types/index.ts"

//++ Computes statistical metrics for analyzed files
export default function computeFileStats(
	files: Array<PerFileAnalysis>,
): FileStats {
	if (length(files) === 0) {
		return {
			longestFile: { path: "", lines: 0 },
			mean: 0,
			median: 0,
			stdDev: 0,
		}
	}

	const lineCounts = map((f: PerFileAnalysis) => f.lines)(files)

	const longestFile = reduce<PerFileAnalysis, { path: string; lines: number }>(
		(acc, file) => {
			return file.lines > acc.lines
				? { path: file.pathRel, lines: file.lines }
				: acc
		},
	)({ path: "", lines: 0 })(files)

	const sum = reduce<number, number>((acc, n) => acc + n)(0)(lineCounts)
	const mean = sum / length(lineCounts)

	const sorted = sort((a: number, b: number) => a - b)(lineCounts)
	const mid = Math.floor(length(sorted) / 2)
	const median = length(sorted) % 2 === 0
		? (sorted[mid - 1] + sorted[mid]) / 2
		: sorted[mid]

	const squaredDiffs = map((n: number) => Math.pow(n - mean, 2))(lineCounts)
	const variance =
		reduce<number, number>((acc, n) => acc + n)(0)(squaredDiffs) /
		length(lineCounts)
	const stdDev = Math.sqrt(variance)

	return {
		longestFile,
		mean,
		median,
		stdDev,
	}
}
