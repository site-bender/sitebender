/**
 * Toolkit-specific test pattern generator
 * Generates tests following the exact patterns used in @sitebender/toolkit
 */

import type { FunctionSignature, TestCase } from "../types/index.ts"

/**
 * Generate toolkit-style test suite with JSDoc examples, properties, and edge cases
 */
export class ToolkitTestGenerator {
	/**
	 * Generate a complete toolkit-style test file
	 */
	generateToolkitTestFile(signature: FunctionSignature): string {
		const imports = this.generateImports(signature)
		const jsdocTests = this.generateJSDocTests(signature)
		const edgeCases = this.generateToolkitEdgeCases(signature)
		const propertyTests = this.generateToolkitProperties(signature)
		const practicalExamples = this.generatePracticalExamples(signature)
		const curryingTests = this.generateCurryingTests(signature)
		
		return `${imports}

${jsdocTests}

${edgeCases}

${propertyTests}

${curryingTests}

${practicalExamples}`
	}

	/**
	 * Generate imports following toolkit pattern
	 */
	private generateImports(signature: FunctionSignature): string {
		const depth = signature.filePath?.split("/").length ?? 5
		const importPath = "../".repeat(depth - 2) + "src/simple/" + 
			signature.filePath?.split("src/simple/")[1] ?? ""

		return `import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import ${signature.name} from "${importPath}"`
	}

	/**
	 * Generate JSDoc example tests
	 */
	private generateJSDocTests(signature: FunctionSignature): string {
		const name = signature.name
		const tests: Array<string> = []

		// Map-like functions
		if (name.includes("map")) {
			tests.push(`
Deno.test("${name} - JSDoc examples", async (t) => {
	await t.step("maps over array", () => {
		const result = ${name}((n: number) => n * 2)([1, 2, 3])
		assertEquals(result, [2, 4, 6])
	})

	await t.step("maps with index", () => {
		const result = ${name}((n: number, i: number) => n + i)([10, 20, 30])
		assertEquals(result, [10, 21, 32])
	})

	await t.step("composes with other functions", () => {
		const double = ${name}((n: number) => n * 2)
		const addOne = ${name}((n: number) => n + 1)
		const result = addOne(double([1, 2, 3]))
		assertEquals(result, [3, 5, 7])
	})
})`)
		}

		// Filter-like functions
		if (name.includes("filter")) {
			tests.push(`
Deno.test("${name} - JSDoc examples", async (t) => {
	await t.step("filters by predicate", () => {
		const result = ${name}((n: number) => n > 2)([1, 2, 3, 4])
		assertEquals(result, [3, 4])
	})

	await t.step("filters strings by length", () => {
		const result = ${name}((s: string) => s.length > 3)(["hi", "hello"])
		assertEquals(result, ["hello"])
	})

	await t.step("compose filters", () => {
		const keepPositive = ${name}((n: number) => n > 0)
		const keepEven = ${name}((n: number) => n % 2 === 0)
		const result = keepEven(keepPositive([-2, -1, 0, 1, 2, 3, 4]))
		assertEquals(result, [2, 4])
	})
})`)
		}

		// Reduce-like functions
		if (name.includes("reduce") || name.includes("fold")) {
			tests.push(`
Deno.test("${name} - JSDoc examples", async (t) => {
	await t.step("sum numbers", () => {
		const result = ${name}((acc: number, n: number) => acc + n)(0)([1, 2, 3])
		assertEquals(result, 6)
	})

	await t.step("build new array", () => {
		const result = ${name}((acc: Array<number>, n: number) => [...acc, n * 2])([])([1, 2, 3])
		assertEquals(result, [2, 4, 6])
	})

	await t.step("build object from pairs", () => {
		const result = ${name}((acc: Record<string, number>, [k, v]: [string, number]) => 
			({ ...acc, [k]: v }))({})([["a", 1], ["b", 2]])
		assertEquals(result, { a: 1, b: 2 })
	})
})`)
		}

		// Math functions
		if (signature.parameters.every(p => p.type === "number")) {
			tests.push(`
Deno.test("${name} - JSDoc examples", async (t) => {
	await t.step("basic operation", () => {
		const result = ${name}(2)(3)
		// Add appropriate assertion based on function
		assertEquals(typeof result, "number")
	})

	await t.step("partial application", () => {
		const fn = ${name}(5)
		const result1 = fn(10)
		const result2 = fn(20)
		assertEquals(typeof result1, "number")
		assertEquals(typeof result2, "number")
	})
})`)
		}

		return tests.join("\n") || this.generateDefaultJSDocTests(signature)
	}

	/**
	 * Generate edge case tests in toolkit style
	 */
	private generateToolkitEdgeCases(signature: FunctionSignature): string {
		const name = signature.name
		const tests: Array<string> = []

		// Array functions
		if (this.isArrayFunction(signature)) {
			tests.push(`
Deno.test("${name} - empty array returns ${this.getEmptyReturn(signature)}", () => {
	const result = ${name}(${this.getDefaultArgs(signature)})([])
	assertEquals(result, ${this.getEmptyReturn(signature)})
})

Deno.test("${name} - null input returns ${this.getNullReturn(signature)}", () => {
	const result = ${name}(${this.getDefaultArgs(signature)})(null)
	assertEquals(result, ${this.getNullReturn(signature)})
})

Deno.test("${name} - undefined input returns ${this.getUndefinedReturn(signature)}", () => {
	const result = ${name}(${this.getDefaultArgs(signature)})(undefined)
	assertEquals(result, ${this.getUndefinedReturn(signature)})
})`)
		}

		// Number functions
		if (signature.parameters.every(p => p.type === "number")) {
			tests.push(`
Deno.test("${name} - handles NaN", () => {
	const result = ${name}(NaN)(5)
	assert(Number.isNaN(result) || result === ${this.getNaNReturn(name)})
})

Deno.test("${name} - handles Infinity", () => {
	const result1 = ${name}(Infinity)(5)
	const result2 = ${name}(5)(Infinity)
	// Add appropriate assertions
	assertExists(result1)
	assertExists(result2)
})

Deno.test("${name} - handles negative zero", () => {
	const result = ${name}(-0)(0)
	assertEquals(Object.is(result, ${this.getZeroReturn(name)}), true)
})`)
		}

		return tests.join("\n")
	}

	/**
	 * Generate property-based tests in toolkit style
	 */
	private generateToolkitProperties(signature: FunctionSignature): string {
		const name = signature.name
		const tests: Array<string> = []

		// Filter properties
		if (name.includes("filter")) {
			tests.push(`
Deno.test("${name} - property: preserves order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.func(fc.boolean()),
			(array, predicate) => {
				const filtered = ${name}(predicate)(array)
				
				// Check that order is preserved
				let lastIndex = -1
				for (const item of filtered) {
					const currentIndex = array.indexOf(item, lastIndex + 1)
					if (currentIndex <= lastIndex) return false
					lastIndex = currentIndex
				}
				return true
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("${name} - property: result is subset of original", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.func(fc.boolean()),
			(array, predicate) => {
				const filtered = ${name}(predicate)(array)
				return filtered.every(item => array.includes(item))
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("${name} - property: idempotence", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(array) => {
				const isEven = (n: number) => n % 2 === 0
				const filtered1 = ${name}(isEven)(array)
				const filtered2 = ${name}(isEven)(filtered1)
				return JSON.stringify(filtered1) === JSON.stringify(filtered2)
			}
		),
		{ numRuns: 1000 }
	)
})`)
		}

		// Map properties
		if (name.includes("map")) {
			tests.push(`
Deno.test("${name} - property: preserves length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.func(fc.anything()),
			(array, fn) => {
				const mapped = ${name}(fn)(array)
				return mapped.length === array.length
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("${name} - property: identity law", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				const identity = (x: any) => x
				const result = ${name}(identity)(array)
				return JSON.stringify(result) === JSON.stringify(array)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("${name} - property: composition law", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(array) => {
				const f = (n: number) => n * 2
				const g = (n: number) => n + 1
				const compose = (f: any) => (g: any) => (x: any) => f(g(x))
				
				const result1 = ${name}(compose(f)(g))(array)
				const result2 = ${name}(f)(${name}(g)(array))
				return JSON.stringify(result1) === JSON.stringify(result2)
			}
		),
		{ numRuns: 500 }
	)
})`)
		}

		// Reduce properties
		if (name.includes("reduce")) {
			tests.push(`
Deno.test("${name} - property: associativity with compatible operations", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 100 })),
			(array) => {
				if (array.length < 3) return true
				
				// Test with addition (associative operation)
				const add = (a: number, b: number) => a + b
				const result = ${name}(add)(0)(array)
				const expected = array.reduce(add, 0)
				return result === expected
			}
		),
		{ numRuns: 1000 }
	)
})`)
		}

		return tests.join("\n")
	}

	/**
	 * Generate currying behavior tests
	 */
	private generateCurryingTests(signature: FunctionSignature): string {
		if (!signature.isCurried) return ""

		const name = signature.name
		return `
Deno.test("${name} - currying behavior", () => {
	const partial = ${name}(${this.getDefaultFirstArg(signature)})
	
	// Same partially applied function can be reused
	const result1 = partial(${this.getDefaultSecondArg(signature)})
	const result2 = partial(${this.getDefaultSecondArg(signature, true)})
	
	assertExists(result1)
	assertExists(result2)
	
	// Partially applied function is a function
	assertEquals(typeof partial, "function")
})`
	}

	/**
	 * Generate practical examples following toolkit patterns
	 */
	private generatePracticalExamples(signature: FunctionSignature): string {
		const name = signature.name
		const examples: Array<string> = []

		if (name.includes("filter")) {
			examples.push(`
Deno.test("${name} - practical examples", () => {
	// Remove falsy values
	const compact = ${name}(Boolean)
	assertEquals(
		compact([0, 1, false, 2, "", 3, null, undefined, 4]),
		[1, 2, 3, 4]
	)
	
	// Filter by property
	const hasId = ${name}((item: any) => item?.id != null)
	assertEquals(
		hasId([{id: 1}, {name: "test"}, {id: 2}, null]),
		[{id: 1}, {id: 2}]
	)
	
	// Pattern matching
	const startsWithA = ${name}((s: string) => s.startsWith("A"))
	assertEquals(
		startsWithA(["Apple", "Banana", "Apricot", "Cherry"]),
		["Apple", "Apricot"]
	)
})`)
		}

		if (name.includes("map")) {
			examples.push(`
Deno.test("${name} - practical examples", () => {
	// Extract property
	const getIds = ${name}((item: {id: number}) => item.id)
	assertEquals(
		getIds([{id: 1, name: "a"}, {id: 2, name: "b"}]),
		[1, 2]
	)
	
	// Transform strings
	const toUpperCase = ${name}((s: string) => s.toUpperCase())
	assertEquals(
		toUpperCase(["hello", "world"]),
		["HELLO", "WORLD"]
	)
})`)
		}

		return examples.join("\n")
	}

	// Helper methods
	private isArrayFunction(signature: FunctionSignature): boolean {
		return signature.parameters.some(p => 
			p.type.includes("Array") || p.type.includes("[]")
		) || signature.returnType.includes("Array")
	}

	private getEmptyReturn(signature: FunctionSignature): string {
		if (signature.returnType.includes("Array")) return "[]"
		if (signature.returnType === "number") return "0"
		if (signature.returnType === "string") return '""'
		return "undefined"
	}

	private getNullReturn(signature: FunctionSignature): string {
		// Toolkit functions typically return initial value or empty for null
		if (signature.name.includes("reduce")) return "initialValue"
		if (signature.returnType.includes("Array")) return "[]"
		return "null"
	}

	private getUndefinedReturn(signature: FunctionSignature): string {
		// Similar to null handling
		return this.getNullReturn(signature)
	}

	private getNaNReturn(name: string): string {
		if (name.includes("add") || name.includes("multiply")) return "NaN"
		if (name.includes("min") || name.includes("max")) return "NaN"
		return "undefined"
	}

	private getZeroReturn(name: string): string {
		if (name.includes("add")) return "0"
		if (name.includes("multiply")) return "0"
		return "0"
	}

	private getDefaultArgs(signature: FunctionSignature): string {
		const params = signature.parameters.filter(p => !p.type.includes("Array"))
		if (params.length === 0) return ""
		
		if (params[0].type.includes("=>")) return "(x: any) => x"
		if (params[0].type === "number") return "0"
		if (params[0].type === "string") return '""'
		return "null"
	}

	private getDefaultFirstArg(signature: FunctionSignature): string {
		const param = signature.parameters[0]
		if (!param) return "null"
		
		if (param.type.includes("=>")) return "(x: any) => x"
		if (param.type === "number") return "5"
		if (param.type === "string") return '"test"'
		if (param.type.includes("Array")) return "[1, 2, 3]"
		return "null"
	}

	private getDefaultSecondArg(signature: FunctionSignature, different = false): string {
		const param = signature.parameters[1] ?? signature.parameters[0]
		if (!param) return "null"
		
		if (param.type.includes("Array")) return different ? "[4, 5, 6]" : "[1, 2, 3]"
		if (param.type === "number") return different ? "10" : "5"
		if (param.type === "string") return different ? '"other"' : '"test"'
		return "null"
	}

	private generateDefaultJSDocTests(signature: FunctionSignature): string {
		return `
Deno.test("${signature.name} - basic functionality", () => {
	// Add basic tests based on function signature
	const result = ${signature.name}(${this.getDefaultArgs(signature)})
	assertExists(result)
})`
	}
}