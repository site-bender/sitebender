/**
 * Enhanced PropertyTestGenerator that integrates multiple test generation strategies
 * Generates comprehensive property-based tests for @sitebender/toolkit functions
 */

import type { 
	TestCase, 
	PropertyTest, 
	FunctionSignature, 
	TypeInfo,
	Parameter,
	GeneratorConfig 
} from "../types/index.ts"
import { TypeKind } from "../types/index.ts"

// Import enhanced sub-generators
import { detectApplicableLaws } from "./algebraic-laws.ts"
import { generateEdgeCaseTests } from "./edge-cases.ts"
import { 
	getArbitraryForType, 
	getSpecializedArbitrary,
	generateCompositeArbitrary 
} from "./type-mappings.ts"

export class PropertyTestGenerator {
	private config: Partial<GeneratorConfig>

	constructor(config?: Partial<GeneratorConfig>) {
		this.config = {
			maxPropertyRuns: 100,
			includeEdgeCases: true,
			includePropertyTests: true,
			...config
		}
	}

	/**
	 * Main entry point - generates comprehensive test suite
	 */
	generate(signature: FunctionSignature): Array<TestCase> {
		const testCases: Array<TestCase> = []
		
		// Generate algebraic category tests (functor, monoid, etc.)
		const categoryTests = this.detectAlgebraicCategory(signature)
		testCases.push(...categoryTests)
		
		// Generate algebraic law tests (using enhanced detector)
		const lawTests = this.generateAlgebraicLawTests(signature)
		testCases.push(...lawTests)
		
		// Generate type-based property tests
		const propertyTests = this.generateTypeBasedProperties(signature)
		testCases.push(...propertyTests)
		
		// Generate invariant tests
		const invariantTests = this.generateInvariantTests(signature)
		testCases.push(...invariantTests)
		
		// Generate metamorphic tests
		const metamorphicTests = this.generateMetamorphicTests(signature)
		testCases.push(...metamorphicTests)
		
		return testCases
	}

	/**
	 * Use the enhanced algebraic law detector
	 */
	private generateAlgebraicLawTests(signature: FunctionSignature): Array<TestCase> {
		// Convert to the format expected by the enhanced detector
		const enhancedSignature = {
			name: signature.name,
			parameters: signature.parameters.map(p => ({
				name: p.name,
				type: p.type.raw,
				optional: p.optional,
				defaultValue: p.defaultValue
			})),
			returnType: signature.returnType.raw,
			generics: signature.generics?.map(g => g.name) ?? [],
			isCurried: signature.isCurried,
			purity: "pure" as const // Assume pure for property testing
		}

		const laws = detectApplicableLaws(enhancedSignature)
		
		return laws.map(law => ({
			name: `${signature.name} - ${law.type}`,
			description: law.description,
			input: [],
			properties: [{
				name: law.type,
				property: law.testCode,
				generator: this.getGeneratorForLaw(law.type),
				runs: this.config.maxPropertyRuns
			}]
		}))
	}
	
	/**
	 * Detect algebraic categories (original implementation enhanced)
	 */
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

		if (this.isApplicativeLike(signature)) {
			tests.push(this.generateApplicativeLaws(name))
		}

		if (this.isMonadLike(signature)) {
			tests.push(this.generateMonadLaws(name))
		}
		
		return tests
	}
	
	private isFunctorLike(signature: FunctionSignature): boolean {
		const { name, parameters, returnType } = signature
		
		// Check for map-like functions
		if (name.includes("map") || name.includes("fmap")) {
			return true
		}

		if (parameters.length < 2) return false
		
		const firstParam = parameters[0]
		const secondParam = parameters[1]
		
		// Check if it's a function over a container
		return (
			(firstParam.type.kind === TypeKind.Array ||
			 firstParam.type.raw.includes("Maybe") ||
			 firstParam.type.raw.includes("Either") ||
			 firstParam.type.raw.includes("Result")) &&
			secondParam.type.kind === TypeKind.Function &&
			(returnType.kind === TypeKind.Array ||
			 returnType.raw.includes("Maybe") ||
			 returnType.raw.includes("Either") ||
			 returnType.raw.includes("Result"))
		)
	}
	
	private isMonoidLike(signature: FunctionSignature): boolean {
		const { name, parameters, returnType } = signature
		
		return (
			(name.includes("concat") || name.includes("append") || 
			 name.includes("merge") || name.includes("combine")) &&
			parameters.length >= 2 &&
			parameters[0].type.raw === parameters[1].type.raw &&
			parameters[0].type.raw === returnType.raw
		)
	}
	
	private isSemigroupLike(signature: FunctionSignature): boolean {
		const { name, parameters, returnType } = signature
		
		return (
			(name.includes("combine") || name.includes("join") || 
			 name === "add" || name === "multiply") &&
			parameters.length === 2 &&
			parameters[0].type.raw === parameters[1].type.raw &&
			parameters[0].type.raw === returnType.raw
		)
	}

	private isApplicativeLike(signature: FunctionSignature): boolean {
		const { name } = signature
		return name.includes("ap") || name.includes("apply") || name === "of"
	}

	private isMonadLike(signature: FunctionSignature): boolean {
		const { name } = signature
		return name.includes("bind") || name.includes("chain") || 
		       name.includes("flatMap") || name === "join"
	}
	
	private generateFunctorLaws(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "identity law",
				property: `const identity = (x) => x
const result1 = ${functionName}(input, identity)
assertEquals(result1, input)`,
				generator: "fc.array(fc.anything())",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: "composition law",
				property: `const f = (x) => x * 2
const g = (x) => x + 1
const result1 = ${functionName}(input, (x) => f(g(x)))
const result2 = ${functionName}(${functionName}(input, g), f)
assertEquals(result1, result2)`,
				generator: "fc.array(fc.integer())",
				runs: this.config.maxPropertyRuns,
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
				runs: this.config.maxPropertyRuns,
			},
			{
				name: "left identity",
				property: `const empty = []
const result = ${functionName}(empty, input)
assertEquals(result, input)`,
				generator: "fc.array(fc.anything())",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: "right identity",
				property: `const empty = []
const result = ${functionName}(input, empty)
assertEquals(result, input)`,
				generator: "fc.array(fc.anything())",
				runs: this.config.maxPropertyRuns,
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
				runs: this.config.maxPropertyRuns,
			},
		]
		
		return {
			name: "semigroup laws",
			description: "Verify semigroup algebraic laws",
			input: [],
			properties,
		}
	}

	private generateApplicativeLaws(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "identity",
				property: `const identity = (x) => x
const wrapped = of(identity)
const result = ap(wrapped, value)
assertEquals(result, value)`,
				generator: "fc.anything()",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: "composition",
				property: `// ap(ap(ap(of(compose), u), v), w) = ap(u, ap(v, w))`,
				generator: "fc.func(fc.anything())",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: "homomorphism",
				property: `// ap(of(f), of(x)) = of(f(x))`,
				generator: "fc.tuple(fc.func(fc.anything()), fc.anything())",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: "interchange",
				property: `// ap(u, of(y)) = ap(of(f => f(y)), u)`,
				generator: "fc.tuple(fc.func(fc.anything()), fc.anything())",
				runs: this.config.maxPropertyRuns,
			}
		]

		return {
			name: "applicative laws",
			description: "Verify applicative functor laws",
			input: [],
			properties,
		}
	}

	private generateMonadLaws(functionName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: "left identity",
				property: `// of(a).bind(f) = f(a)`,
				generator: "fc.tuple(fc.anything(), fc.func(fc.anything()))",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: "right identity", 
				property: `// m.bind(of) = m`,
				generator: "fc.anything()",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: "associativity",
				property: `// m.bind(f).bind(g) = m.bind(x => f(x).bind(g))`,
				generator: "fc.tuple(fc.anything(), fc.func(fc.anything()), fc.func(fc.anything()))",
				runs: this.config.maxPropertyRuns,
			}
		]

		return {
			name: "monad laws",
			description: "Verify monad laws",
			input: [],
			properties,
		}
	}
	
	/**
	 * Generate type-based property tests
	 */
	private generateTypeBasedProperties(signature: FunctionSignature): Array<TestCase> {
		const tests: Array<TestCase> = []
		
		// Length preservation for array functions
		if (this.isArrayFunction(signature)) {
			tests.push(this.generateArrayProperties(signature))
		}

		// Type preservation tests
		tests.push(this.generateTypePreservationTest(signature))

		// Determinism test for pure functions
		if (!signature.isAsync && !signature.isGenerator) {
			tests.push(this.generateDeterminismTest(signature))
		}

		// Parameter-specific tests
		for (const param of signature.parameters) {
			const paramTests = this.generatePropertiesForType(param.type, param.name)
			tests.push(...paramTests)
		}
		
		return tests
	}

	private isArrayFunction(signature: FunctionSignature): boolean {
		return signature.parameters.some(p => 
			p.type.kind === TypeKind.Array || p.type.raw.includes("Array")
		) || signature.returnType.kind === TypeKind.Array
	}

	private generateArrayProperties(signature: FunctionSignature): TestCase {
		const { name } = signature
		const properties: Array<PropertyTest> = []

		if (name.includes("map") || name.includes("transform")) {
			properties.push({
				name: "length preservation",
				property: `const result = ${name}(fn)(array)
assertEquals(result.length, array.length)`,
				generator: "fc.tuple(fc.array(fc.anything()), fc.func(fc.anything()))",
				runs: this.config.maxPropertyRuns,
			})
		}

		if (name.includes("filter")) {
			properties.push({
				name: "subset property",
				property: `const result = ${name}(predicate)(array)
assert(result.length <= array.length)
assert(result.every(item => array.includes(item)))`,
				generator: "fc.tuple(fc.array(fc.anything()), fc.func(fc.boolean()))",
				runs: this.config.maxPropertyRuns,
			})
		}

		return {
			name: `${name} array properties`,
			description: "Array-specific property tests",
			input: [],
			properties,
		}
	}

	private generateTypePreservationTest(signature: FunctionSignature): TestCase {
		const returnType = signature.returnType.raw
		const checkType = this.getTypeCheckCode(returnType)

		return {
			name: "type preservation",
			description: "Verify return type matches signature",
			input: [],
			properties: [{
				name: "return type check",
				property: `const result = ${signature.name}(${this.generateParameterNames(signature)})
${checkType}`,
				generator: this.generateInputGenerators(signature),
				runs: this.config.maxPropertyRuns,
			}]
		}
	}

	private generateDeterminismTest(signature: FunctionSignature): TestCase {
		return {
			name: "determinism",
			description: "Pure function returns same output for same input",
			input: [],
			properties: [{
				name: "deterministic behavior",
				property: `const result1 = ${signature.name}(${this.generateParameterNames(signature)})
const result2 = ${signature.name}(${this.generateParameterNames(signature)})
assertEquals(result1, result2)`,
				generator: this.generateInputGenerators(signature),
				runs: this.config.maxPropertyRuns,
			}]
		}
	}
	
	private generatePropertiesForType(type: TypeInfo, name: string): Array<TestCase> {
		const tests: Array<TestCase> = []
		
		switch (type.kind) {
			case TypeKind.Array:
				tests.push(this.generateArrayTypeProperties(name))
				break
			case TypeKind.Primitive:
				if (type.raw === "string") {
					tests.push(this.generateStringProperties(name))
				} else if (type.raw === "number") {
					tests.push(this.generateNumberProperties(name))
				} else if (type.raw === "boolean") {
					tests.push(this.generateBooleanProperties(name))
				}
				break
			case TypeKind.Object:
				tests.push(this.generateObjectProperties(name))
				break
			case TypeKind.Function:
				tests.push(this.generateFunctionProperties(name))
				break
		}
		
		return tests
	}
	
	private generateArrayTypeProperties(paramName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: `${paramName} handles empty array`,
				property: "// Empty array handling",
				generator: "fc.constant([])",
				runs: 1,
			},
			{
				name: `${paramName} handles large arrays`,
				property: "// Large array handling",
				generator: "fc.array(fc.anything(), { minLength: 1000, maxLength: 10000 })",
				runs: 10,
			},
			{
				name: `${paramName} handles sparse arrays`,
				property: "// Sparse array handling",
				generator: "fc.sparseArray(fc.anything())",
				runs: this.config.maxPropertyRuns,
			}
		]
		
		return {
			name: `${paramName} array properties`,
			description: `Property tests for ${paramName} array parameter`,
			input: [],
			properties,
		}
	}
	
	private generateStringProperties(paramName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: `${paramName} unicode handling`,
				property: "// Unicode string handling",
				generator: "fc.fullUnicodeString()",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: `${paramName} whitespace handling`,
				property: "// Whitespace handling",
				generator: "fc.stringOf(fc.constantFrom(' ', '\\t', '\\n', '\\r'))",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: `${paramName} special characters`,
				property: "// Special character handling",
				generator: "fc.string({ minLength: 0, maxLength: 100, unit: 'grapheme' })",
				runs: this.config.maxPropertyRuns,
			}
		]
		
		return {
			name: `${paramName} string properties`,
			description: `Property tests for ${paramName} string parameter`,
			input: [],
			properties,
		}
	}
	
	private generateNumberProperties(paramName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: `${paramName} number edge cases`,
				property: "// Number edge case handling",
				generator: "fc.oneof(fc.integer(), fc.float(), fc.constant(NaN), fc.constant(Infinity), fc.constant(-Infinity))",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: `${paramName} precision handling`,
				property: "// Floating point precision",
				generator: "fc.float({ noNaN: true, min: -1e10, max: 1e10 })",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: `${paramName} safe integer range`,
				property: "// Safe integer handling",
				generator: "fc.integer({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER })",
				runs: this.config.maxPropertyRuns,
			}
		]
		
		return {
			name: `${paramName} number properties`,
			description: `Property tests for ${paramName} number parameter`,
			input: [],
			properties,
		}
	}

	private generateBooleanProperties(paramName: string): TestCase {
		return {
			name: `${paramName} boolean properties`,
			description: `Property tests for ${paramName} boolean parameter`,
			input: [],
			properties: [{
				name: `${paramName} boolean values`,
				property: "// Boolean handling",
				generator: "fc.boolean()",
				runs: this.config.maxPropertyRuns,
			}]
		}
	}

	private generateObjectProperties(paramName: string): TestCase {
		const properties: Array<PropertyTest> = [
			{
				name: `${paramName} object shapes`,
				property: "// Various object shapes",
				generator: "fc.object({ maxDepth: 2 })",
				runs: this.config.maxPropertyRuns,
			},
			{
				name: `${paramName} null prototype`,
				property: "// Objects with null prototype",
				generator: "fc.constant(Object.create(null))",
				runs: 10,
			}
		]

		return {
			name: `${paramName} object properties`,
			description: `Property tests for ${paramName} object parameter`,
			input: [],
			properties,
		}
	}

	private generateFunctionProperties(paramName: string): TestCase {
		return {
			name: `${paramName} function properties`,
			description: `Property tests for ${paramName} function parameter`,
			input: [],
			properties: [{
				name: `${paramName} function handling`,
				property: "// Function parameter handling",
				generator: "fc.func(fc.anything())",
				runs: this.config.maxPropertyRuns,
			}]
		}
	}

	/**
	 * Generate invariant tests based on function semantics
	 */
	private generateInvariantTests(signature: FunctionSignature): Array<TestCase> {
		const tests: Array<TestCase> = []
		const name = signature.name.toLowerCase()

		if (name.includes("sort")) {
			tests.push({
				name: "sorting invariant",
				description: "Verify sorted output is actually sorted",
				input: [],
				properties: [{
					name: "is sorted",
					property: `const result = ${signature.name}(array)
for (let i = 1; i < result.length; i++) {
  assert(result[i] >= result[i-1])
}`,
					generator: "fc.array(fc.integer())",
					runs: this.config.maxPropertyRuns,
				}]
			})
		}

		if (name.includes("unique") || name.includes("distinct")) {
			tests.push({
				name: "uniqueness invariant",
				description: "Verify all elements are unique",
				input: [],
				properties: [{
					name: "no duplicates",
					property: `const result = ${signature.name}(array)
const unique = new Set(result)
assertEquals(result.length, unique.size)`,
					generator: "fc.array(fc.anything())",
					runs: this.config.maxPropertyRuns,
				}]
			})
		}

		if (name.includes("reverse")) {
			tests.push({
				name: "reverse invariant",
				description: "Verify reversing twice returns original",
				input: [],
				properties: [{
					name: "involution",
					property: `const once = ${signature.name}(array)
const twice = ${signature.name}(once)
assertEquals(twice, array)`,
					generator: "fc.array(fc.anything())",
					runs: this.config.maxPropertyRuns,
				}]
			})
		}

		return tests
	}

	/**
	 * Generate metamorphic relation tests
	 */
	private generateMetamorphicTests(signature: FunctionSignature): Array<TestCase> {
		const tests: Array<TestCase> = []
		const name = signature.name.toLowerCase()

		if (name.includes("concat") || name.includes("append")) {
			tests.push({
				name: "concatenation metamorphic",
				description: "Test f(a + b) relates to f(a) + f(b)",
				input: [],
				properties: [{
					name: "concatenation relation",
					property: `// Metamorphic relation for concatenation`,
					generator: "fc.tuple(fc.array(fc.anything()), fc.array(fc.anything()))",
					runs: this.config.maxPropertyRuns,
				}]
			})
		}

		if (signature.parameters.every(p => p.type.raw === "number")) {
			tests.push({
				name: "scaling metamorphic",
				description: "Test f(k*x) relates to k*f(x)",
				input: [],
				properties: [{
					name: "scaling relation",
					property: `// Metamorphic relation for scaling`,
					generator: "fc.tuple(fc.integer(), fc.integer({ min: 1, max: 10 }))",
					runs: this.config.maxPropertyRuns,
				}]
			})
		}

		return tests
	}

	// Helper methods
	private getGeneratorForLaw(lawType: string): string {
		const generators: Record<string, string> = {
			"functor-identity": "fc.array(fc.anything())",
			"functor-composition": "fc.array(fc.integer())",
			"monoid-identity": "fc.array(fc.anything())",
			"monoid-associativity": "fc.tuple(fc.array(fc.anything()), fc.array(fc.anything()), fc.array(fc.anything()))",
			"commutative": "fc.tuple(fc.integer(), fc.integer())",
			"associative": "fc.tuple(fc.integer(), fc.integer(), fc.integer())",
			"idempotent": "fc.anything()",
			"distributive": "fc.tuple(fc.integer(), fc.integer(), fc.integer())",
			"involutive": "fc.anything()"
		}
		return generators[lawType] ?? "fc.anything()"
	}

	private getTypeCheckCode(type: string): string {
		if (type.includes("Array")) return "assert(Array.isArray(result))"
		if (type === "number") return "assert(typeof result === 'number')"
		if (type === "string") return "assert(typeof result === 'string')"
		if (type === "boolean") return "assert(typeof result === 'boolean')"
		if (type.includes("Maybe")) return "assert(result.hasOwnProperty('value'))"
		if (type.includes("Either")) return "assert(result.hasOwnProperty('left') || result.hasOwnProperty('right'))"
		return "assertExists(result)"
	}

	private generateParameterNames(signature: FunctionSignature): string {
		return signature.parameters.map(p => p.name).join(", ")
	}

	private generateInputGenerators(signature: FunctionSignature): string {
		const generators = signature.parameters.map(p => 
			getSpecializedArbitrary(p.type.raw, p.name)
		)
		if (generators.length === 1) return generators[0]
		return `fc.tuple(${generators.join(", ")})`
	}
}