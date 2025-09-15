//++ Execute violation checks sequentially preserving order
import type { ViolationCheck } from "../types/index.ts"

import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"

import runViolationCheck from "../runViolationCheck/index.ts"
import collectCheck from "../collectCheck/index.ts"

export function collectResults(
	checks: Array<ViolationCheck>,
): Promise<Array<{ check: ViolationCheck; stdout: string }>> {
	return reduce(collectCheck)(
		Promise.resolve<Array<{ check: ViolationCheck; stdout: string }>>([])
	)(checks)
}

export default collectResults
