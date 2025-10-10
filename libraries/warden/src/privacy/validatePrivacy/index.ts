//++ Validate privacy rules for a given root path
//++
//++ This is the main orchestrator function for privacy validation.
//++ It coordinates the entire validation pipeline:
//++ 1. Build import graph from root directory
//++ 2. Find privacy violations in the graph
//++ 3. Return ValidationResult with success status and violations
//++
//++ This is an async function (IO boundary): validatePrivacy(rootPath) => Promise<ValidationResult>
//++
//++ Examples:
//++   validatePrivacy("src/privacy")
//++   => { success: true, violations: [], filesChecked: 5, executionTime: 50, phase: "block" }
//++
//++   validatePrivacy("src/with/violations")
//++   => { success: false, violations: [...], filesChecked: 10, executionTime: 100, phase: "block" }

import buildGraph from "../../importGraph/buildGraph/index.ts"
import findViolations from "../findViolations/index.ts"
import type { ValidationResult } from "../../types/index.ts"

//++ [IO] This function performs side effects (file system access)
export default function validatePrivacy(
	rootPath: string,
): Promise<ValidationResult> {
	const startTime = performance.now()

	return buildGraph(rootPath).then(function analyzeGraph(importGraph) {
		// Find all privacy violations in the graph
		const violations = findViolations(importGraph)

		// Calculate metrics
		const endTime = performance.now()
		const executionTime = endTime - startTime
		const filesChecked = importGraph.size
		const success = violations.length === 0

		// Build result
		const result: ValidationResult = {
			success,
			violations,
			filesChecked,
			executionTime,
			phase: "block",
		}

		return result
	})
}
