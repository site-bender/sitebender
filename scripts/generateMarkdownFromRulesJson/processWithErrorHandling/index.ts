import type { RulesFile } from "../types/index.ts"

import concat from "../../../libraries/toolsmith/src/vanilla/string/concat/index.ts"
import processRulesFile from "../processRulesFile/index.ts"

//++ Processes a rules file with error handling and logging
export default function processWithErrorHandling(
	rulesFile: RulesFile,
): void {
	try {
		processRulesFile(rulesFile)
	} catch (error) {
		const path = rulesFile.jsonPath || "unknown"
		const errorMessage = error instanceof Error ? error.message : String(error)

		console.error(
			concat("❌ Failed to process ")(
				concat(path)(concat(": ")(errorMessage)),
			),
		)
	}
}

//?? [EXAMPLE]
// processWithErrorHandling({path: "...", jsonPath: "...", markdownPath: "..."})
// Processes the file and logs errors if they occur
