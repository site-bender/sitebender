//++ Main enforcement orchestrator for Warden
//++
//++ This is the top-level enforcement function that orchestrates privacy validation
//++ across multiple targets. It's curried: enforce(config) => Promise<ValidationResult>
//++
//++ Workflow:
//++ 1. Extract targets and phase from config
//++ 2. Run validatePrivacy on each target
//++ 3. Collect all violations across all targets
//++ 4. Aggregate metrics (total files checked, execution time)
//++ 5. Return comprehensive ValidationResult
//++
//++ This is an async function (IO boundary): performs file system access via validatePrivacy
//++
//++ Examples:
//++   enforce({ targets: ["src/"], phase: "block" })
//++   => { success: true, violations: [], filesChecked: 20, executionTime: 100, phase: "block" }
//++
//++   enforce({ targets: ["src/", "lib/"], phase: "warn" })
//++   => { success: false, violations: [...], filesChecked: 50, executionTime: 250, phase: "warn" }

import validatePrivacy from "../../privacy/validatePrivacy/index.ts"
import type { ValidationResult, WardenConfig } from "../../types/index.ts"

//++ Helper: Aggregate multiple validation results into a single result
//++ Takes array of results and combines them into one comprehensive result
function aggregateResults(
	results: ReadonlyArray<ValidationResult>,
) {
	return function aggregateWithPhase(phase: string): ValidationResult {
		// Collect all violations from all results
		const allViolations = results.flatMap(function extractViolations(result) {
			return result.violations
		})

		// Sum total files checked
		const totalFilesChecked = results.reduce(
			function sumFiles(total, result) {
				return total + result.filesChecked
			},
			0,
		)

		// Sum total execution time
		const totalExecutionTime = results.reduce(
			function sumTime(total, result) {
				return total + result.executionTime
			},
			0,
		)

		// Success if no violations found
		const success = allViolations.length === 0

		return {
			success,
			violations: allViolations,
			filesChecked: totalFilesChecked,
			executionTime: totalExecutionTime,
			phase: phase as "pending" | "warn" | "block",
		}
	}
}

//++ [IO] This function performs side effects (file system access via validatePrivacy)
export default function enforce(
	config: WardenConfig,
): Promise<ValidationResult> {
	const startTime = performance.now()
	const { targets, phase } = config

	// Validate each target in sequence (could parallelize in Phase 4)
	const validationPromises = targets.map(function validateTarget(target) {
		return validatePrivacy(target)
	})

	// Wait for all validations to complete
	return Promise.all(validationPromises).then(
		function combineResults(results) {
			// Aggregate all results into a single ValidationResult
			const aggregated = aggregateResults(results)(phase)

			// Update execution time to reflect total orchestration time
			const endTime = performance.now()
			const totalTime = endTime - startTime

			return {
				...aggregated,
				executionTime: totalTime,
			}
		},
	)
}
