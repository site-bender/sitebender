import type { CoverageData } from "../parseLcovReport/index.ts"

export interface CoveragePercentages {
	overall: number
	linesCovered: number
	linesTotal: number
	linePercentage: number
	branchesCovered: number
	branchesTotal: number
	branchPercentage: number
}

/**
 * Calculates coverage percentages from the coverage data
 * @param coverageData Coverage data from report
 * @param functionPath Path to the function file
 * @returns Coverage percentages breakdown
 */
export default function calculatePercentages(
	coverageData: CoverageData,
	functionPath: string
): CoveragePercentages {
	// Find the file in coverage data
	const fileData = coverageData.files.find((file: CoverageData['files'][0]) => 
		file.path.includes(functionPath) || 
		functionPath.includes(file.path)
	)
	
	if (!fileData) {
		return {
			overall: 0,
			linesCovered: 0,
			linesTotal: 0,
			linePercentage: 0,
			branchesCovered: 0,
			branchesTotal: 0,
			branchPercentage: 0
		}
	}
	
	const linePercentage = fileData.lines.found > 0
		? (fileData.lines.hit / fileData.lines.found) * 100
		: 100
		
	const branchPercentage = fileData.branches.found > 0
		? (fileData.branches.hit / fileData.branches.found) * 100
		: 100
	
	// Overall is weighted average (lines count more than branches)
	const overall = fileData.branches.found > 0
		? (linePercentage * 0.7 + branchPercentage * 0.3)
		: linePercentage
	
	return {
		overall: Math.round(overall * 10) / 10,
		linesCovered: fileData.lines.hit,
		linesTotal: fileData.lines.found,
		linePercentage: Math.round(linePercentage * 10) / 10,
		branchesCovered: fileData.branches.hit,
		branchesTotal: fileData.branches.found,
		branchPercentage: Math.round(branchPercentage * 10) / 10
	}
}