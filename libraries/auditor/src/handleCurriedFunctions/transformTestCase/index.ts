import type { FunctionSignature, TestCase } from "../../types/index.ts"

import generateCurriedInputs from "../generateCurriedInputs/index.ts"
import getExpectedOutputForInvalid from "../getExpectedOutputForInvalid/index.ts"
import needsCurriedHandling from "../needsCurriedHandling/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function transformTestCase(
	testCase: TestCase,
	signature: FunctionSignature,
): TestCase {
	if (!needsCurriedHandling(signature)) {
		return testCase
	}

	// Ensure we have enough inputs for all curry levels
	const transformedInputs = generateCurriedInputs(
		[...testCase.input],
		signature,
	)

	return {
		...testCase,
		input: transformedInputs,
		// Update expected output if needed
		expectedOutput: testCase.expectedOutput ??
			getExpectedOutputForInvalid(signature),
	}
}
