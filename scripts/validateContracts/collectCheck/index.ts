import type { ViolationCheck } from "../types/index.ts"

import runViolationCheck from "../runViolationCheck/index.ts"

//++ Collects a single check result
export default function collectCheck(
	accPromise: Promise<Array<{ check: ViolationCheck; stdout: string }>>,
	check: ViolationCheck
): Promise<Array<{ check: ViolationCheck; stdout: string }>> {
	return accPromise.then(async function processCheck(acc) {
		const result = await runViolationCheck(check)
		return [...acc, result]
	})
}