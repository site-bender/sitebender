//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { FunctionSignature, TestCase } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateMonadPatternTests(
	signature: FunctionSignature,
): Array<TestCase> {
	const tests: Array<TestCase> = []
	const returnType = signature.returnType.raw
	const name = signature.name.toLowerCase()

	// Maybe monad tests
	if (returnType.includes("Maybe") || name.includes("maybe")) {
		tests.push({
			name: "left identity law",
			description: "return a >>= f ≡ f a",
			input: [5],
			expectedOutput: undefined,
			properties: [{
				name: "monad left identity",
				generator: "fc.anything(), fc.func(fc.anything())",
				property: `
					const m1 = Maybe.of(value).chain(f)
					const m2 = f(value)
					return m1.equals(m2)
				`,
			}],
		})

		tests.push({
			name: "right identity law",
			description: "m >>= return ≡ m",
			input: [5],
			expectedOutput: undefined,
			properties: [{
				name: "monad right identity",
				generator: "fc.anything()",
				property: `
					const m = Maybe.of(value)
					const result = m.chain(Maybe.of)
					return m.equals(result)
				`,
			}],
		})

		tests.push({
			name: "handles null/undefined",
			description: "Wraps null/undefined as Nothing",
			input: [null],
			expectedOutput: { tag: "Nothing" },
		})

		tests.push({
			name: "handles values",
			description: "Wraps values as Just",
			input: [42],
			expectedOutput: { tag: "Just", value: 42 },
		})
	}

	// Either monad tests
	if (returnType.includes("Either") || name.includes("either")) {
		tests.push({
			name: "creates Left for errors",
			description: "Error values become Left",
			input: [new Error("fail")],
			expectedOutput: { tag: "Left", value: "fail" },
		})

		tests.push({
			name: "creates Right for success",
			description: "Success values become Right",
			input: [42],
			expectedOutput: { tag: "Right", value: 42 },
		})

		tests.push({
			name: "associativity law",
			description: "(m >>= f) >>= g ≡ m >>= (λx → f x >>= g)",
			input: [10],
			expectedOutput: undefined,
			properties: [{
				name: "monad associativity",
				generator:
					"fc.anything(), fc.func(fc.anything()), fc.func(fc.anything())",
				property: `
					const m = Either.of(value)
					const left = m.chain(f).chain(g)
					const right = m.chain(x => f(x).chain(g))
					return left.equals(right)
				`,
			}],
		})

		tests.push({
			name: "map over Right",
			description: "Mapping transforms Right values",
			input: [5],
			expectedOutput: { tag: "Right", value: 10 },
			properties: [{
				name: "functor map",
				generator: "fc.anything(), fc.func(fc.anything())",
				property: `
					const right = Either.Right(value)
					const mapped = right.map(f)
					return mapped.tag === "Right" && mapped.value === f(value)
				`,
			}],
		})

		tests.push({
			name: "map over Left unchanged",
			description: "Mapping doesn't affect Left values",
			input: ["error"],
			expectedOutput: { tag: "Left", value: "error" },
			properties: [{
				name: "left unchanged",
				generator: "fc.anything(), fc.func(fc.anything())",
				property: `
					const left = Either.Left(value)
					const mapped = left.map(f)
					return left.equals(mapped)
				`,
			}],
		})
	}

	// Result monad tests
	if (returnType.includes("Result") || name.includes("result")) {
		tests.push({
			name: "Ok wraps success",
			description: "Successful computations return Ok",
			input: [42],
			expectedOutput: { tag: "Ok", value: 42 },
		})

		tests.push({
			name: "Err wraps failure",
			description: "Failed computations return Err",
			input: [new Error("failed")],
			expectedOutput: { tag: "Err", error: "failed" },
		})

		tests.push({
			name: "chain propagates errors",
			description: "Chaining on Err skips computation",
			input: ["error"],
			expectedOutput: { tag: "Err", error: "error" },
			properties: [{
				name: "error propagation",
				generator: "fc.anything(), fc.func(fc.anything())",
				property: `
					const err = Result.Err(error)
					const chained = err.chain(f)
					return err.equals(chained)
				`,
			}],
		})
	}

	// Chain/bind/flatMap tests
	if (
		name.includes("chain") || name.includes("bind") ||
		name.includes("flatmap")
	) {
		tests.push({
			name: "flattens nested monads",
			description: "Chain removes one layer of monad wrapping",
			input: [(x: number) => [x, x * 2], [1, 2, 3]],
			expectedOutput: [1, 2, 2, 4, 3, 6],
			properties: [{
				name: "flatten operation",
				generator: "fc.func(fc.array(fc.anything())), fc.array(fc.anything())",
				property: `
					const result = chain(f)(arr)
					const manual = arr.flatMap(f)
					return JSON.stringify(result) === JSON.stringify(manual)
				`,
			}],
		})
	}

	return tests
}
