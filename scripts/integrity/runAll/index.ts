import type { AggregatedResults, ScriptResult } from "../types/index.ts"

import { PENDING_SCRIPTS } from "../constants/index.ts"

import { calculateSummary } from "./calculateSummary/index.ts"
import { createPendingResult } from "./createPendingResult/index.ts"
import { determineDecision } from "./determineDecision/index.ts"
import { runGraphHashGate } from "./runGraphHashGate/index.ts"

//++ Run all integrity scripts and aggregate results
export async function runAll(): Promise<AggregatedResults> {
	const runId = Temporal.Now.instant().toString()

	// Run implemented scripts
	const graphHashResult = await runGraphHashGate()

	// Create pending results for unimplemented scripts
	const pendingResults = PENDING_SCRIPTS.map(createPendingResult)

	// Combine all results
	const results: ReadonlyArray<ScriptResult> = [
		graphHashResult,
		...pendingResults,
	]

	// Calculate summary and decision
	const summary = calculateSummary(results)
	const decision = determineDecision(results)

	return {
		runId,
		results,
		decision,
		summary,
	}
}

// Run if invoked directly
if (import.meta.main) {
	const result = await runAll()
	console.log(JSON.stringify(result, null, 2))
}
