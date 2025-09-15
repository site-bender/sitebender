import type { PerFileAnalysis } from "../../../types/index.ts"

//++ Accumulates total lines and tracks the file with most lines
export default function accumulateLongestFile(
	acc: { total: number; longest: PerFileAnalysis },
	f: PerFileAnalysis,
): { total: number; longest: PerFileAnalysis } {
	return {
		total: acc.total + f.lines,
		longest: f.lines > acc.longest.lines ? f : acc.longest,
	}
}