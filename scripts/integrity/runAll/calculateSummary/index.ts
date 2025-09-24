import type { ScriptResult, Summary } from "../../types/index.ts"

import reduce from "../../../../libraries/toolsmith/src/vanilla/array/reduce/index.ts"

//++ Calculate summary from script results
export function calculateSummary(
	results: ReadonlyArray<ScriptResult>,
): Summary {
	return reduce<ScriptResult, Summary>(
		(acc: Summary, result: ScriptResult) => ({
			...acc,
			blockers: result.status === "error" && result.phase === "block"
				? acc.blockers + 1
				: acc.blockers,
			critical: result.severity === "critical"
				? acc.critical + 1
				: acc.critical,
			high: result.severity === "high" ? acc.high + 1 : acc.high,
			medium: result.severity === "medium" ? acc.medium + 1 : acc.medium,
			info: result.severity === "info" ? acc.info + 1 : acc.info,
		}),
	)({ critical: 0, high: 0, medium: 0, info: 0, blockers: 0 })(results)
}
