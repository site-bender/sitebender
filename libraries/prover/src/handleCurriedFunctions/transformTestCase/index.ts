import type { FunctionSignature, TestCase } from "../../types/index.ts"
import needsCurriedHandling from "../needsCurriedHandling/index.ts"
import generateCurriedInputs from "../generateCurriedInputs/index.ts"
import getExpectedOutputForInvalid from "../getExpectedOutputForInvalid/index.ts"

/**
 * Transforms a test case for curried function testing
 * @param testCase Original test case
 * @param signature Function signature information
 * @returns Transformed test case with proper curry inputs
 */
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
