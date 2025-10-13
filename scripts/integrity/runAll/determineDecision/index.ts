import type { Decision, ScriptResult } from "../../types/index.ts"

import some from "../../../../libraries/toolsmith/src/array/some/index.ts"

//++ Determine overall decision based on script results
export function determineDecision(
	results: ReadonlyArray<ScriptResult>,
): Decision {
	const hasBlocker = some<ScriptResult>(
		(result: ScriptResult) =>
			result.phase === "block" && result.status === "error",
	)(results as Array<ScriptResult>)

	if (hasBlocker) {
		return "block"
	}

	const hasWarning = some<ScriptResult>(
		(result: ScriptResult) =>
			result.status === "warn" ||
			(result.phase === "warn" && result.status === "error"),
	)(results as Array<ScriptResult>)

	if (hasWarning) {
		return "warn"
	}

	return "allow"
}
