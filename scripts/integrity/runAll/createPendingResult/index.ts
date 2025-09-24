import type { ScriptResult } from "../../types/index.ts"

//++ Create a pending result for a script that hasn't been implemented yet
export function createPendingResult(name: string): ScriptResult {
	return {
		name,
		phase: "pending",
		status: "pending",
	}
}
