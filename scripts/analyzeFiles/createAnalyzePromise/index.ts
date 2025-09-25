import type { AnalysisOptions, PerFileAnalysis } from "../types/index.ts"

import analyzeFile from "../analyzeFile/index.ts"

//++ Creates a promise to analyze a file (properly curried: config => root => filePath => result)
export default function createAnalyzePromise(
	config: { onlyDefault?: boolean },
): (root: string) => (filePath: string) => Promise<PerFileAnalysis> {
	return function withRoot(
		root: string,
	): (filePath: string) => Promise<PerFileAnalysis> {
		return function withFilePath(
			filePath: string,
		): Promise<PerFileAnalysis> {
			return analyzeFile({
				absPath: filePath,
				root,
				onlyDefault: config.onlyDefault,
			})
		}
	}
}
