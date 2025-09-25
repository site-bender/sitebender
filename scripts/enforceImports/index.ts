import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"
import isEmpty from "@sitebender/toolsmith/vanilla/array/isEmpty/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

import { DEFAULT_ALIAS_SCOPES } from "../constants/index.ts"
import flattenViolationArrays from "./flattenViolationArrays/index.ts"
import formatViolationsReport from "./formatViolationsReport/index.ts"
import processRoot from "./processRoot/index.ts"

//++ Enforces repo alias policy for cross-package imports
export default async function enforceImports(
	rootsArg: Array<string> = Deno.args,
): Promise<void> {
	const roots = length(rootsArg) > 0 ? rootsArg : DEFAULT_ALIAS_SCOPES

	// Process all roots
	const violationPromises = map(processRoot)(roots)
	const violationArrays = await Promise.all(violationPromises)
	const violations = flatMap(flattenViolationArrays)(violationArrays)

	if (!isEmpty(violations)) {
		const report = formatViolationsReport(violations)
		console.error(report)
		Deno.exit(1)
	}

	console.log("Alias policy: OK (no violations found).")
}

if (import.meta.main) {
	await enforceImports()
}
