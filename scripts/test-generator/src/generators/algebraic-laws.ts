/**
 * Detects and generates tests for algebraic laws
 */

import type { 
	FunctionSignature, 
	AlgebraicLawType, 
	ApplicableLaw,
	FunctionPattern,
	PatternMatch 
} from "../types/index.ts"

/**
 * Detect which algebraic laws apply to a function based on its signature and name
 */
export function detectApplicableLaws(signature: FunctionSignature): Array<ApplicableLaw> {
	const laws: Array<ApplicableLaw> = []
	const pattern = detectFunctionPattern(signature)

	if (pattern) {
		laws.push(...getLawsForPattern(pattern, signature))
	}

	// Add universal laws that apply to all pure functions
	if (signature.purity === "pure") {
		laws.push(getReferentialTransparencyLaw(signature))
	}

	return laws
}

/**
 * Detect the pattern/category of a function
 */
function detectFunctionPattern(signature: FunctionSignature): PatternMatch | null {
	const name = signature.name.toLowerCase()
	const { parameters, returnType } = signature

	// Map-like functions
	if (name.includes("map") || 
		(parameters.some(p => p.type.includes("=>")) && 
		 parameters.some(p => p.type.includes("Array")) &&
		 returnType.includes("Array"))) {
		return {
			pattern: "mapper",
			confidence: 0.9,
			applicableLaws: ["functor-identity", "functor-composition"]
		}
	}

	// Filter-like functions
	if (name.includes("filter") || name.includes("select") || name.includes("where")) {
		return {
			pattern: "filter",
			confidence: 0.9,
			applicableLaws: ["idempotent"]
		}
	}

	// Reduce-like functions
	if (name.includes("reduce") || name.includes("fold") || name.includes("aggregate")) {
		return {
			pattern: "reducer",
			confidence: 0.9,
			applicableLaws: ["associative"]
		}
	}

	// Predicate functions
	if (returnType === "boolean" && parameters.length > 0) {
		return {
			pattern: "predicate",
			confidence: 0.8,
			applicableLaws: []
		}
	}

	// Arithmetic operations
	if (name.match(/^(add|subtract|multiply|divide|sum|product)/) ||
		name.match(/^(plus|minus|times)/) ||
		(parameters.every(p => p.type === "number") && returnType === "number")) {
		const laws: Array<AlgebraicLawType> = []
		
		if (name.includes("add") || name.includes("sum") || name === "plus") {
			laws.push("commutative", "associative")
		}
		if (name.includes("multiply") || name.includes("product") || name === "times") {
			laws.push("commutative", "associative")
		}

		return {
			pattern: "arithmetic",
			confidence: 0.95,
			applicableLaws: laws
		}
	}

	// Comparison operations
	if (name.match(/^(equals?|compare|gt|gte|lt|lte|min|max)/) ||
		name.match(/^(is|has)/) && returnType === "boolean") {
		return {
			pattern: "comparison",
			confidence: 0.85,
			applicableLaws: name.includes("equal") ? ["commutative"] : []
		}
	}

	// Combinator functions
	if (name.includes("compose") || name.includes("pipe") || 
		name.includes("chain") || name.includes("then") ||
		parameters.every(p => p.type.includes("=>"))) {
		return {
			pattern: "combinator",
			confidence: 0.9,
			applicableLaws: ["associative"]
		}
	}

	// Constructor/factory functions
	if (name.startsWith("create") || name.startsWith("make") || 
		name.startsWith("build") || name === "of" || name === "from") {
		return {
			pattern: "constructor",
			confidence: 0.7,
			applicableLaws: []
		}
	}

	// Accessor functions
	if (name.startsWith("get") || name.includes("extract") || 
		name === "head" || name === "tail" || name === "last" ||
		name === "first" || name.includes("index")) {
		return {
			pattern: "accessor",
			confidence: 0.8,
			applicableLaws: []
		}
	}

	// Modifier functions
	if (name.startsWith("set") || name.includes("update") || 
		name.includes("modify") || name.includes("transform")) {
		return {
			pattern: "modifier",
			confidence: 0.75,
			applicableLaws: []
		}
	}

	return null
}

/**
 * Get specific law implementations for a pattern
 */
function getLawsForPattern(pattern: PatternMatch, signature: FunctionSignature): Array<ApplicableLaw> {
	const laws: Array<ApplicableLaw> = []

	for (const lawType of pattern.applicableLaws) {
		const law = generateLawTest(lawType, signature, pattern.pattern)
		if (law) {
			laws.push(law)
		}
	}

	return laws
}

/**
 * Generate a specific algebraic law test
 */
function generateLawTest(
	lawType: AlgebraicLawType, 
	signature: FunctionSignature, 
	pattern: FunctionPattern
): ApplicableLaw | null {
	switch (lawType) {
		case "functor-identity":
			return generateFunctorIdentityLaw(signature)
		
		case "functor-composition":
			return generateFunctorCompositionLaw(signature)
		
		case "monoid-identity":
			return generateMonoidIdentityLaw(signature)
		
		case "monoid-associativity":
			return generateMonoidAssociativityLaw(signature)
		
		case "commutative":
			return generateCommutativeLaw(signature)
		
		case "associative":
			return generateAssociativeLaw(signature)
		
		case "idempotent":
			return generateIdempotentLaw(signature)
		
		case "distributive":
			return generateDistributiveLaw(signature)
		
		case "involutive":
			return generateInvolutiveLaw(signature)
		
		default:
			return null
	}
}

/**
 * Generate functor identity law: map(id) = id
 */
function generateFunctorIdentityLaw(signature: FunctionSignature): ApplicableLaw {
	return {
		type: "functor-identity",
		description: "Functor identity law: mapping identity function should return unchanged array",
		testCode: `
fc.assert(
	fc.property(
		fc.array(fc.anything()),
		(arr) => {
			const identity = (x: any) => x
			const result = ${signature.name}(identity)(arr)
			assertEquals(result, arr)
		}
	)
)`,
		requiredTypes: ["Array"]
	}
}

/**
 * Generate functor composition law: map(f ∘ g) = map(f) ∘ map(g)
 */
function generateFunctorCompositionLaw(signature: FunctionSignature): ApplicableLaw {
	return {
		type: "functor-composition",
		description: "Functor composition law: map(f ∘ g) = map(f) ∘ map(g)",
		testCode: `
fc.assert(
	fc.property(
		fc.array(fc.integer()),
		fc.func(fc.integer()),
		fc.func(fc.integer()),
		(arr, f, g) => {
			const compose = (f: any) => (g: any) => (x: any) => f(g(x))
			const composed = compose(f)(g)
			
			const result1 = ${signature.name}(composed)(arr)
			const result2 = ${signature.name}(f)(${signature.name}(g)(arr))
			
			assertEquals(result1, result2)
		}
	)
)`,
		requiredTypes: ["Array", "Function"]
	}
}

/**
 * Generate monoid identity law
 */
function generateMonoidIdentityLaw(signature: FunctionSignature): ApplicableLaw {
	const identityValue = detectIdentityValue(signature)
	return {
		type: "monoid-identity",
		description: "Monoid identity law: combining with identity element yields same value",
		testCode: `
fc.assert(
	fc.property(
		fc.anything(),
		(value) => {
			const identity = ${identityValue}
			assertEquals(${signature.name}(identity)(value), value)
			assertEquals(${signature.name}(value)(identity), value)
		}
	)
)`,
		requiredTypes: []
	}
}

/**
 * Generate monoid associativity law
 */
function generateMonoidAssociativityLaw(signature: FunctionSignature): ApplicableLaw {
	return {
		type: "monoid-associativity",
		description: "Monoid associativity law: (a • b) • c = a • (b • c)",
		testCode: `
fc.assert(
	fc.property(
		fc.anything(),
		fc.anything(),
		fc.anything(),
		(a, b, c) => {
			const result1 = ${signature.name}(${signature.name}(a)(b))(c)
			const result2 = ${signature.name}(a)(${signature.name}(b)(c))
			assertEquals(result1, result2)
		}
	)
)`,
		requiredTypes: []
	}
}

/**
 * Generate commutative law: f(a, b) = f(b, a)
 */
function generateCommutativeLaw(signature: FunctionSignature): ApplicableLaw {
	const paramType = signature.parameters[0]?.type ?? "anything"
	return {
		type: "commutative",
		description: "Commutative law: f(a, b) = f(b, a)",
		testCode: `
fc.assert(
	fc.property(
		${getGeneratorForType(paramType)},
		${getGeneratorForType(paramType)},
		(a, b) => {
			const result1 = ${signature.name}(a)(b)
			const result2 = ${signature.name}(b)(a)
			assertEquals(result1, result2)
		}
	)
)`,
		requiredTypes: []
	}
}

/**
 * Generate associative law: (a • b) • c = a • (b • c)
 */
function generateAssociativeLaw(signature: FunctionSignature): ApplicableLaw {
	const paramType = signature.parameters[0]?.type ?? "anything"
	return {
		type: "associative",
		description: "Associative law: (a • b) • c = a • (b • c)",
		testCode: `
fc.assert(
	fc.property(
		${getGeneratorForType(paramType)},
		${getGeneratorForType(paramType)},
		${getGeneratorForType(paramType)},
		(a, b, c) => {
			const result1 = ${signature.name}(${signature.name}(a)(b))(c)
			const result2 = ${signature.name}(a)(${signature.name}(b)(c))
			assertEquals(result1, result2)
		}
	)
)`,
		requiredTypes: []
	}
}

/**
 * Generate idempotent law: f(f(x)) = f(x)
 */
function generateIdempotentLaw(signature: FunctionSignature): ApplicableLaw {
	const paramType = signature.parameters[0]?.type ?? "anything"
	return {
		type: "idempotent",
		description: "Idempotent law: applying function twice yields same result",
		testCode: `
fc.assert(
	fc.property(
		${getGeneratorForType(paramType)},
		(value) => {
			const result1 = ${signature.name}(value)
			const result2 = ${signature.name}(result1)
			assertEquals(result1, result2)
		}
	)
)`,
		requiredTypes: []
	}
}

/**
 * Generate distributive law
 */
function generateDistributiveLaw(signature: FunctionSignature): ApplicableLaw {
	return {
		type: "distributive",
		description: "Distributive law: a • (b + c) = (a • b) + (a • c)",
		testCode: `
fc.assert(
	fc.property(
		fc.integer(),
		fc.integer(),
		fc.integer(),
		(a, b, c) => {
			// This is a template - actual implementation depends on operations
			// Would need context about what operations distribute over what
			assertEquals(true, true) // Placeholder
		}
	)
)`,
		requiredTypes: []
	}
}

/**
 * Generate involutive law: f(f(x)) = x
 */
function generateInvolutiveLaw(signature: FunctionSignature): ApplicableLaw {
	const paramType = signature.parameters[0]?.type ?? "anything"
	return {
		type: "involutive",
		description: "Involutive law: applying function twice returns to original",
		testCode: `
fc.assert(
	fc.property(
		${getGeneratorForType(paramType)},
		(value) => {
			const result = ${signature.name}(${signature.name}(value))
			assertEquals(result, value)
		}
	)
)`,
		requiredTypes: []
	}
}

/**
 * Generate referential transparency law for pure functions
 */
function getReferentialTransparencyLaw(signature: FunctionSignature): ApplicableLaw {
	const params = signature.parameters
		.map(p => getGeneratorForType(p.type))
		.join(", ")

	return {
		type: "functor-identity", // Using existing type, but this is referential transparency
		description: "Referential transparency: same inputs always produce same outputs",
		testCode: `
fc.assert(
	fc.property(
		${params || "fc.anything()"},
		(${signature.parameters.map(p => p.name).join(", ") || "input"}) => {
			const result1 = ${signature.name}(${signature.parameters.map(p => p.name).join(")(") || "input"})
			const result2 = ${signature.name}(${signature.parameters.map(p => p.name).join(")(") || "input"})
			assertEquals(result1, result2)
		}
	)
)`,
		requiredTypes: []
	}
}

/**
 * Helper to get generator for a type
 */
function getGeneratorForType(type: string): string {
	// Simplified version - would import from type-mappings
	if (type === "number") return "fc.integer()"
	if (type === "string") return "fc.string()"
	if (type === "boolean") return "fc.boolean()"
	if (type.includes("Array")) return "fc.array(fc.anything())"
	if (type.includes("=>")) return "fc.func(fc.anything())"
	return "fc.anything()"
}

/**
 * Detect the identity value for a monoid operation
 */
function detectIdentityValue(signature: FunctionSignature): string {
	const name = signature.name.toLowerCase()
	
	if (name.includes("add") || name.includes("sum")) return "0"
	if (name.includes("multiply") || name.includes("product")) return "1"
	if (name.includes("concat") || name.includes("append")) return '""'
	if (name.includes("and")) return "true"
	if (name.includes("or")) return "false"
	if (name.includes("max")) return "-Infinity"
	if (name.includes("min")) return "Infinity"
	
	return "undefined"
}

/**
 * Check if a function likely satisfies a specific law
 */
export function likelySatisfiesLaw(
	signature: FunctionSignature, 
	lawType: AlgebraicLawType
): boolean {
	const pattern = detectFunctionPattern(signature)
	if (!pattern) return false
	
	return pattern.applicableLaws.includes(lawType)
}