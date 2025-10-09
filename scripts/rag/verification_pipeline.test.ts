/**
 * Tests for Verification Pipeline
 */

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import verifyGeneratedCode, {
	formatVerificationResult,
	shouldBlockCode,
} from "./verification_pipeline.ts"

Deno.test("verifyGeneratedCode - passes clean code", function testPassCleanCode() {
	const code = `
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}
`
	const result = verifyGeneratedCode(code)
	assertEquals(result.valid, true)
})

Deno.test("verifyGeneratedCode - fails code with classes", function testFailClasses() {
	const code = `
class UserService {
	private users = []
}
`
	const result = verifyGeneratedCode(code)
	assertEquals(result.valid, false)
	if (!result.valid) {
		assertEquals(result.violations.length > 0, true)
		assertEquals(result.violations[0].rule, "no-classes")
	}
})

Deno.test("verifyGeneratedCode - fails code with loops", function testFailLoops() {
	const code = `
for (let i = 0; i < 10; i++) {
	console.log(i)
}
`
	const result = verifyGeneratedCode(code)
	assertEquals(result.valid, false)
})

Deno.test("verifyGeneratedCode - fails code with try-catch", function testFailTryCatch() {
	const code = `
try {
	riskyOperation()
} catch (e) {
	handleError(e)
}
`
	const result = verifyGeneratedCode(code)
	assertEquals(result.valid, false)
})

Deno.test("verifyGeneratedCode - fails code with mutations", function testFailMutations() {
	const code = `array.push(item)`
	const result = verifyGeneratedCode(code)
	assertEquals(result.valid, false)
})

Deno.test("verifyGeneratedCode - fails code with arrow functions", function testFailArrowFunctions() {
	const code = `const add = (a, b) => a + b`
	const result = verifyGeneratedCode(code)
	assertEquals(result.valid, false)
})

Deno.test("formatVerificationResult - formats valid result", function testFormatValid() {
	const result = { valid: true as const, code: "test" }
	const formatted = formatVerificationResult(result)
	assertEquals(formatted.includes("✅"), true)
	assertEquals(formatted.includes("passes"), true)
})

Deno.test("formatVerificationResult - formats invalid result", function testFormatInvalid() {
	const code = `class Test {}`
	const result = verifyGeneratedCode(code)
	const formatted = formatVerificationResult(result)

	assertEquals(formatted.includes("🚫"), true)
	assertEquals(formatted.includes("CRITICAL VIOLATIONS"), true)
	assertEquals(formatted.includes("regenerate"), true)
})

Deno.test("shouldBlockCode - blocks invalid code", function testShouldBlock() {
	const code = `class Test {}`
	const result = verifyGeneratedCode(code)
	assertEquals(shouldBlockCode(result), true)
})

Deno.test("shouldBlockCode - allows valid code", function testShouldAllow() {
	const code = `
export default function test() {
	return function inner() {
		return 42
	}
}
`
	const result = verifyGeneratedCode(code)
	assertEquals(shouldBlockCode(result), false)
})

Deno.test("verifyGeneratedCode - multiple violations", function testMultipleViolations() {
	const code = `
class UserService {
	process() {
		for (let i = 0; i < 10; i++) {
			this.items.push(i)
		}
	}
}
`
	const result = verifyGeneratedCode(code)
	assertEquals(result.valid, false)
	if (!result.valid) {
		assertEquals(result.violations.length > 1, true)
	}
})
