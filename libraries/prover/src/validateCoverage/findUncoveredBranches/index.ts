import type CoverageData from "../parseLcovReport/types/index.ts"

/**
 * Finds uncovered branches for a specific function file
 * @param coverageData Coverage data from report
 * @param functionPath Path to the function file
 * @returns Array of uncovered branch identifiers
 */
export default function findUncoveredBranches(
	coverageData: CoverageData,
	functionPath: string
): Array<string> {
	// Find the file in coverage data
	const fileData = coverageData.files.find((file: CoverageData['files'][0]) => 
		file.path.includes(functionPath) || 
		functionPath.includes(file.path)
	)
	
	if (!fileData) {
		return []
	}
	
	// Find branches that were not taken
	return fileData.branches.details
		.filter(branchDetail => branchDetail.taken === 0)
		.map(branchDetail => `Line ${branchDetail.line}, Branch ${branchDetail.branch}`)
}