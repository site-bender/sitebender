import type { TestCase, PropertyTest, FunctionSignature, TypeInfo } from "../types/index.ts"
import { TypeKind } from "../types/index.ts"

export class PropertyTestGenerator {
	generate(signature: FunctionSignature): Array<TestCase> {
		const testCases: Array<TestCase> = []
		
		const categoryTests = this.detectAlgebraicCategory(signature)
		testCases.push(...categoryTests)
		
		const lawTests = this.detectAlgebraicLaws(signature)
		testCases.push(...lawTests)
		
		const propertyTests = this.generateTypeBasedProperties(signature)
		testCases.push(...propertyTests)
		
		return testCases
	}
	
	private detectAlgebraicCategory(signature: FunctionSignature): Array<TestCase> {
		const tests: Array<TestCase> = []
		const { name, parameters, returnType } = signature
		
		if (this.isFunctorLike(signature)) {
			tests.push(this.generateFunctorLaws(name))
		}
		
		if (this.isMonoidLike(signature)) {
			tests.push(this.generateMonoidLaws(name))
		}
		
		if (this.isSemigroupLike(signature)) {
			tests.push(this.generateSemigroupLaws(name))
		}
		
		return tests
	}
	
	private isFunctorLike(signature: FunctionSignature): boolean {
		const { parameters, returnType } = signature
		
		if (parameters.length < 2) return false
		
		const firstParam = parameters[0]
		const secondParam = parameters[1]
		
		return (
			firstParam.type.kind === TypeKind.Array &&
			secondParam.type.kind === TypeKind.Function &&
			returnType.kind === TypeKind.Array
		)
	}
	
	private isMonoidLike(signature: FunctionSignature): boolean {
		const { name, parameters, returnType } = signature
		
		return (
			(name.includes("concat") || name.includes("append") || name.includes("merge")) &&
			parameters.length >= 2 &&
			parameters[0].type.raw === parameters[1].type.raw &&
			parameters[0].type.raw === returnType.raw
		)
	}
	
	private isSemigroupLike(signature: FunctionSignature): boolean {
		const { name, parameters, returnType } = signature
		
		return (
			(name.includes("combine") || name.includes("join")) &&
			parameters.length === 2 &&
			parameters[0].type.raw === parameters[1].type.raw &&
			parameters[0].type.raw === returnType.raw
		)
	}
	
	private generateFunctorLaws(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "identity law",
				property: `const identity = (x) => x
const result1 = ${functionName}(input, identity)
assertEquals(result1, input)`,
				generator: "fc.array(fc.anything())",
				runs: 100,
			},
			{
				name: "composition law",
				property: `const f = (x) => x * 2
const g = (x) => x + 1
const result1 = ${functionName}(input, (x) => f(g(x)))
const result2 = ${functionName}(${functionName}(input, g), f)
assertEquals(result1, result2)`,
				generator: "fc.array(fc.integer())",
				runs: 100,
			},
		]
		
		return {
			name: "functor laws",
			description: "Verify functor algebraic laws",
			input: [],
			properties,
		}
	}
	
	private generateMonoidLaws(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "associativity",
				property: `const result1 = ${functionName}(${functionName}(a, b), c)
const result2 = ${functionName}(a, ${functionName}(b, c))
assertEquals(result1, result2)`,
				generator: "fc.tuple(fc.array(fc.anything()), fc.array(fc.anything()), fc.array(fc.anything()))",
				runs: 100,
			},
			{
				name: "left identity",
				property: `const empty = []
const result = ${functionName}(empty, input)
assertEquals(result, input)`,
				generator: "fc.array(fc.anything())",
				runs: 100,
			},
			{
				name: "right identity",
				property: `const empty = []
const result = ${functionName}(input, empty)
assertEquals(result, input)`,
				generator: "fc.array(fc.anything())",
				runs: 100,
			},
		]
		
		return {
			name: "monoid laws",
			description: "Verify monoid algebraic laws",
			input: [],
			properties,
		}
	}
	
	private generateSemigroupLaws(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "associativity",
				property: `const result1 = ${functionName}(${functionName}(a, b), c)
const result2 = ${functionName}(a, ${functionName}(b, c))
assertEquals(result1, result2)`,
				generator: "fc.tuple(fc.string(), fc.string(), fc.string())",
				runs: 100,
			},
		]
		
		return {
			name: "semigroup laws",
			description: "Verify semigroup algebraic laws",
			input: [],
			properties,
		}
	}
	
	private detectAlgebraicLaws(signature: FunctionSignature): Array<TestCase> {
		const tests: Array<TestCase> = []
		const { name } = signature
		
		if (name.includes("sort")) {
			tests.push(this.generateSortProperties(name))
		}
		
		if (name.includes("filter")) {
			tests.push(this.generateFilterProperties(name))
		}
		
		if (name.includes("reduce")) {
			tests.push(this.generateReduceProperties(name))
		}
		
		if (name.includes("reverse")) {
			tests.push(this.generateReverseProperties(name))
		}
		
		if (name.includes("flatten")) {
			tests.push(this.generateFlattenProperties(name))
		}
		
		return tests
	}
	
	private generateSortProperties(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "idempotence",
				property: `const sorted = ${functionName}(input)
const doubleSorted = ${functionName}(sorted)
assertEquals(sorted, doubleSorted)`,
				generator: "fc.array(fc.integer())",
				runs: 100,
			},
			{
				name: "preserves length",
				property: `const sorted = ${functionName}(input)
assertEquals(sorted.length, input.length)`,
				generator: "fc.array(fc.integer())",
				runs: 100,
			},
		]
		
		return {
			name: "sort properties",
			description: "Verify sorting properties",
			input: [],
			properties,
		}
	}
	
	private generateFilterProperties(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "subset property",
				property: `const predicate = (x) => x > 0
const filtered = ${functionName}(input, predicate)
const allMatch = filtered.every(predicate)
assertEquals(allMatch, true)`,
				generator: "fc.array(fc.integer())",
				runs: 100,
			},
			{
				name: "length property",
				property: `const predicate = (x) => true
const filtered = ${functionName}(input, predicate)
assertEquals(filtered.length, input.length)`,
				generator: "fc.array(fc.anything())",
				runs: 100,
			},
		]
		
		return {
			name: "filter properties",
			description: "Verify filter properties",
			input: [],
			properties,
		}
	}
	
	private generateReduceProperties(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "empty array reduces to initial",
				property: `const initial = 42
const result = ${functionName}([], (acc, x) => acc + x, initial)
assertEquals(result, initial)`,
				generator: "fc.constant(null)",
				runs: 1,
			},
			{
				name: "single element",
				property: `const reducer = (acc, x) => acc + x
const result = ${functionName}([value], reducer, 0)
assertEquals(result, value)`,
				generator: "fc.integer()",
				runs: 100,
			},
		]
		
		return {
			name: "reduce properties",
			description: "Verify reduce properties",
			input: [],
			properties,
		}
	}
	
	private generateReverseProperties(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "involution",
				property: `const reversed = ${functionName}(input)
const doubleReversed = ${functionName}(reversed)
assertEquals(doubleReversed, input)`,
				generator: "fc.array(fc.anything())",
				runs: 100,
			},
			{
				name: "preserves length",
				property: `const reversed = ${functionName}(input)
assertEquals(reversed.length, input.length)`,
				generator: "fc.array(fc.anything())",
				runs: 100,
			},
		]
		
		return {
			name: "reverse properties",
			description: "Verify reverse properties",
			input: [],
			properties,
		}
	}
	
	private generateFlattenProperties(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "flattens one level",
				property: `const nested = [[1], [2], [3]]
const flattened = ${functionName}(nested)
assertEquals(flattened, [1, 2, 3])`,
				generator: "fc.constant(null)",
				runs: 1,
			},
			{
				name: "preserves order",
				property: `const flattened = ${functionName}(input)
let index = 0
for (const subArray of input) {
  for (const item of subArray) {
    assertEquals(flattened[index++], item)
  }
}`,
				generator: "fc.array(fc.array(fc.integer()))",
				runs: 100,
			},
		]
		
		return {
			name: "flatten properties",
			description: "Verify flatten properties",
			input: [],
			properties,
		}
	}
	
	private generateTypeBasedProperties(signature: FunctionSignature): Array<TestCase> {
		const tests: Array<TestCase> = []
		
		for (const param of signature.parameters) {
			const paramTests = this.generatePropertiesForType(param.type, param.name)
			tests.push(...paramTests)
		}
		
		return tests
	}
	
	private generatePropertiesForType(type: TypeInfo, name: string): Array<TestCase> {
		const tests: Array<TestCase> = []
		
		switch (type.kind) {
			case TypeKind.Array:
				tests.push(this.generateArrayProperties(name))
				break
			case TypeKind.Primitive:
				if (type.raw === "string") {
					tests.push(this.generateStringProperties(name))
				} else if (type.raw === "number") {
					tests.push(this.generateNumberProperties(name))
				}
				break
		}
		
		return tests
	}
	
	private generateArrayProperties(paramName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: `${paramName} length preservation`,
				property: "// Check if length is preserved or transformed correctly",
				generator: "fc.array(fc.anything())",
				runs: 100,
			},
		]
		
		return {
			name: `${paramName} array properties`,
			description: `Property tests for ${paramName} parameter`,
			input: [],
			properties,
		}
	}
	
	private generateStringProperties(paramName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: `${paramName} unicode handling`,
				property: "// Check unicode string handling",
				generator: "fc.fullUnicodeString()",
				runs: 100,
			},
		]
		
		return {
			name: `${paramName} string properties`,
			description: `Property tests for ${paramName} parameter`,
			input: [],
			properties,
		}
	}
	
	private generateNumberProperties(paramName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: `${paramName} number properties`,
				property: "// Check number edge cases",
				generator: "fc.oneof(fc.integer(), fc.float(), fc.constant(NaN), fc.constant(Infinity))",
				runs: 100,
			},
		]
		
		return {
			name: `${paramName} number properties`,
			description: `Property tests for ${paramName} parameter`,
			input: [],
			properties,
		}
	}
}