import length from "../../libraries/toolsmith/src/vanilla/array/length/index.ts"
import map from "../../libraries/toolsmith/src/vanilla/array/map/index.ts"
import concat from "../../libraries/toolsmith/src/vanilla/string/concat/index.ts"
import findRulesFiles from "./findRulesFiles/index.ts"
import processWithErrorHandling from "./processWithErrorHandling/index.ts"

//++ Generates markdown documentation from rules JSON files
export default function generateMarkdownFromRulesJson(): void {
	const rulesFiles = findRulesFiles()

	if (length(rulesFiles) === 0) {
		console.log("❌ No rules files found")

		return
	}

	const count = String(length(rulesFiles))

	console.log(
		concat("📝 Generating markdown for ")(concat(count)(" rules file(s)...\n")),
	)

	map(processWithErrorHandling)(rulesFiles)

	console.log("\n✨ All rules documentation generated successfully!")
}

// Run if called directly
if (import.meta.main) {
	generateMarkdownFromRulesJson()
}

//?? [EXAMPLE]
// Run with: deno run --allow-read --allow-write scripts/generateMarkdownFromRulesJson/index.ts
