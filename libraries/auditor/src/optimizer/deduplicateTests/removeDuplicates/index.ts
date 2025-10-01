//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { TestCase } from "../../../types/index.ts"

import computeTestHash from "./computeTestHash/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function removeDuplicates(
	tests: Array<TestCase>,
): Array<TestCase> {
	const seen = new Set<string>()

	return tests.filter((test) => {
		const hash = computeTestHash(test)

		if (!seen.has(hash)) {
			seen.add(hash)
			return true
		}
		return false
	})
}
