//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { FunctionSignature, TestCase } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generatePipePatternTests(
	_signature: FunctionSignature,
): Array<TestCase> {
	const tests: Array<TestCase> = []

	// Test identity: pipe with single function
	tests.push({
		name: "pipe with single function acts as identity",
		description: "Pipe with one function should apply that function",
		input: [[(x: number) => x * 2], 5],
		expectedOutput: 10,
		properties: [{
			name: "single function identity",
			generator: "fc.func(fc.anything()), fc.anything()",
			property: `
				const result = pipe([fn])(input)
				return result === fn(input)
			`,
		}],
	})

	// Test composition order: left-to-right
	tests.push({
		name: "pipe composes left-to-right",
		description: "Functions are applied in order from first to last",
		input: [
			[(x: number) => x + 1, (x: number) => x * 2],
			5,
		],
		expectedOutput: 12, // (5 + 1) * 2
		properties: [{
			name: "left-to-right composition",
			generator:
				"fc.array(fc.func(fc.anything()), { minLength: 2 }), fc.anything()",
			property: `
				const [f, g, ...rest] = functions
				const manual = rest.reduce((acc, fn) => fn(acc), g(f(input)))
				const piped = pipe(functions)(input)
				return manual === piped
			`,
		}],
	})

	// Test empty pipe
	tests.push({
		name: "empty pipe returns identity",
		description: "Pipe with no functions returns input unchanged",
		input: [[], 42],
		expectedOutput: 42,
	})

	// Test with different types
	tests.push({
		name: "pipe preserves type transformations",
		description: "Can transform through different types",
		input: [
			[
				(x: number) => x.toString(),
				(s: string) => s.length,
				(n: number) => n > 0,
			],
			123,
		],
		expectedOutput: true, // "123".length = 3, 3 > 0 = true
	})

	return tests
}
