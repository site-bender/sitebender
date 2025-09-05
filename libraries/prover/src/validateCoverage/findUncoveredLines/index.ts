import type { CoverageData } from "../parseLcovReport/index.ts"

/**
 * Finds uncovered lines for a specific function file
 * @param coverageData Coverage data from lcov report
 * @param functionPath Path to the function file
 * @returns Array of uncovered line numbers
 */
export default function findUncoveredLines(
	coverageData: CoverageData,
	functionPath: string
): Array<number> {
	const fileData = coverageData.files.find((file: CoverageData['files'][0]) => 
		file.path.includes(functionPath) || 
		functionPath.includes(file.path)
	)
	
	if (!fileData) {
		console.warn(`No coverage data found for ${functionPath}`)
		return []
	}
	
	return fileData.lines.details
		.filter(lineDetail => lineDetail.hit === 0)
		.map(lineDetail => lineDetail.line)
		.sort((a, b) => a - b)
}