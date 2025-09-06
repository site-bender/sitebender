export interface ReportData {
	overall: number
	linesCovered: number
	linesTotal: number
	linePercentage: number
	branchesCovered: number
	branchesTotal: number
	branchPercentage: number
	uncoveredLines: Array<number>
	uncoveredBranches: Array<string>
	suggestions: Array<string>
}
