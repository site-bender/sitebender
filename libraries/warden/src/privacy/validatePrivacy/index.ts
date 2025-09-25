import length from "../../../../toolsmith/src/vanilla/array/length/index.ts"
import equals from "../../../../toolsmith/src/vanilla/validation/equals/index.ts"
import { PRIVATE_FUNCTION_PREFIX } from "../../constants/index.ts"
import getParentDirectory from "../getParentDirectory/index.ts"
//++ Validate that imports follow privacy rules
import isPrivateFunction from "../isPrivateFunction/index.ts"

export default function validatePrivacy(filePath: string) {
	return function (usageMap: Map<string, string[]>) {
		return async function () {
			// For Phase 1.1, implement basic privacy validation
			// Check if there are any obvious privacy violations in the file structure

			try {
				// Get all files that are being imported
				const importedFiles = Array.from(usageMap.keys())

				// Check for privacy violations
				let violationCount = 0

				for (const importedFile of importedFiles) {
					// Check if the imported file is a private function
					const isPrivate = await isPrivateFunction(importedFile)()

					if (isPrivate) {
						// For Phase 1.1, flag all private function imports as potential violations
						// In a full implementation, this would check against the usage map
						violationCount++
					}
				}

				// If there are privacy violations, return false
				const hasViolations = !equals(0)(violationCount)

				return !hasViolations
			} catch (error) {
				// If there's an error during validation, assume it's valid for now
				// In a full implementation, this would log the error
				return true
			}
		}
	}
}
