import type ReportData from "./types/index.ts"

/**
 * Generates a human-readable coverage report
 * @param data Coverage report data
 * @returns Formatted coverage report string
 */
export default function generateCoverageReport(data: ReportData): string {
	const lines: Array<string> = []
	
	lines.push("\n📊 COVERAGE REPORT")
	lines.push("=" .repeat(50))
	
	const emoji = data.overall === 100 ? "✅" : data.overall >= 80 ? "🟡" : "❌"
	lines.push(`${emoji} Overall Coverage: ${data.overall}%`)
	
	lines.push(`\n📝 Line Coverage: ${data.linePercentage}%`)
	lines.push(`   Covered: ${data.linesCovered}/${data.linesTotal}`)
	if (data.uncoveredLines.length > 0) {
		lines.push(`   Uncovered lines: ${data.uncoveredLines.join(", ")}`)
	}
	
	if (data.branchesTotal > 0) {
		lines.push(`\n🌳 Branch Coverage: ${data.branchPercentage}%`)
		lines.push(`   Covered: ${data.branchesCovered}/${data.branchesTotal}`)
		if (data.uncoveredBranches.length > 0) {
			lines.push(`   Uncovered branches:`)
			data.uncoveredBranches.forEach(branch => {
				lines.push(`     - ${branch}`)
			})
		}
	}
	
	if (data.suggestions.length > 0) {
		lines.push(`\n💡 Suggestions:`)
		data.suggestions.forEach(suggestion => {
			lines.push(`   • ${suggestion}`)
		})
	}
	
	lines.push("\n" + "=" .repeat(50))
	if (data.overall === 100) {
		lines.push("🎉 Perfect coverage achieved!")
	} else if (data.overall >= 80) {
		lines.push("📈 Good coverage, but room for improvement")
	} else {
		lines.push("⚠️  Coverage needs improvement")
	}
	
	return lines.join("\n")
}