//++ Execute violation checks sequentially preserving order
import type { ViolationCheck } from "../types/index.ts"

import runViolationCheck from "../runViolationCheck/index.ts"

export function collectResults(
	checks: Array<ViolationCheck>,
): Promise<Array<{ check: ViolationCheck; stdout: string }>> {
	return checks
		.reduce(
			(promise, check) =>
				promise.then(async (acc) => {
					const result = await runViolationCheck(check)
					return [...acc, result]
				}),
			Promise.resolve<Array<{ check: ViolationCheck; stdout: string }>>([]),
		)
}

export default collectResults
