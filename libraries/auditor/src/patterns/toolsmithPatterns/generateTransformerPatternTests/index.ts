//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { FunctionSignature, TestCase } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateTransformerPatternTests(
	signature: FunctionSignature,
): Array<TestCase> {
	const name = signature.name.toLowerCase()
	const mapTests = name.includes("map") ? getMapTests() : []
	const filterTests = name.includes("filter") ? getFilterTests() : []
	const reduceTests = name.includes("reduce") ? getReduceTests() : []
	const transformTests =
		(name.includes("transform") || name.includes("convert"))
			? getTransformTests(signature)
			: []

	return [...mapTests, ...filterTests, ...reduceTests, ...transformTests]
}

function getMapTests(): Array<TestCase> {
	return [
		{
			name: "preserves array length",
			description: "Map preserves the length of the input array",
			input: [(x: number) => x * 2, [1, 2, 3]],
			expectedOutput: [2, 4, 6],
			properties: [{
				name: "length preservation",
				generator: "fc.func(fc.anything()), fc.array(fc.anything())",
				property: `(fn, arr) => {
					const result = map(fn)(arr)
					return result.length === arr.length
				}`,
			}],
		},
		{
			name: "identity map",
			description: "Mapping with identity returns original array",
			input: [(x: unknown) => x, [1, 2, 3]],
			expectedOutput: [1, 2, 3],
			properties: [{
				name: "identity law",
				generator: "fc.array(fc.anything())",
				property: `(arr) => {
					const result = map((x: unknown) => x)(arr)
					return JSON.stringify(result) === JSON.stringify(arr)
				}`,
			}],
		},
	]
}

function getFilterTests(): Array<TestCase> {
	return [
		{
			name: "returns subset",
			description: "Filter returns subset of original array",
			input: [(x: number) => x > 2, [1, 2, 3, 4]],
			expectedOutput: [3, 4],
			properties: [{
				name: "subset property",
				generator: "fc.func(fc.boolean()), fc.array(fc.anything())",
				property: `(pred, arr) => {
					const result = filter(pred)(arr)
					return result.every(item => arr.includes(item)) &&
					       result.length <= arr.length
				}`,
			}],
		},
		{
			name: "preserves order",
			description: "Filter preserves relative order of elements",
			input: [(x: number) => x % 2 === 0, [1, 2, 3, 4, 5, 6]],
			expectedOutput: [2, 4, 6],
			properties: [{
				name: "order preservation",
				generator: "fc.func(fc.boolean()), fc.array(fc.integer())",
				property: `(pred, arr) => {
					const result = filter(pred)(arr)
					return result.slice(0, -1).every((item, i) => {
						const idx1 = arr.indexOf(item)
						const idx2 = arr.indexOf(result[i + 1])
						return idx1 < idx2
					})
				}`,
			}],
		},
	]
}

function getReduceTests(): Array<TestCase> {
	return [
		{
			name: "handles empty array with initial value",
			description: "Reduce with initial value on empty array returns initial",
			input: [(acc: number, x: number) => acc + x, 0, []],
			expectedOutput: 0,
		},
		{
			name: "accumulates correctly",
			description: "Reduce accumulates values in order",
			input: [(acc: number, x: number) => acc + x, 0, [1, 2, 3, 4]],
			expectedOutput: 10,
			properties: [{
				name: "accumulation",
				generator:
					"fc.func(fc.integer()), fc.integer(), fc.array(fc.integer())",
				property: `(fn, init, arr) => {
					const result = reduce(fn)(init)(arr)
					const manual = arr.reduce(fn, init)
					return result === manual
				}`,
			}],
		},
	]
}

function getTransformTests(signature: FunctionSignature): Array<TestCase> {
	return [
		{
			name: "transforms input type",
			description: "Successfully transforms from input to output type",
			input: ["123"],
			expectedOutput: 123,
			properties: [{
				name: "type transformation",
				generator: "fc.anything()",
				property: `(input) => {
					const result = ${signature.name}(input)
					return typeof result === '${signature.returnType.raw}'
				}`,
			}],
		},
	]
}
