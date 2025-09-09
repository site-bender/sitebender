import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.217.0/testing/bdd.ts"

import tap from "../../../../libraries/toolkit/src/monads/tap/index.ts"

describe("tap", () => {
	it("should execute side effect and return original value", () => {
		const sideEffects: number[] = []
		const tapper = tap<number>(x => sideEffects.push(x))
		
		const result = tapper(42)
		
		assertEquals(result, 42)
		assertEquals(sideEffects, [42])
	})
	
	it("should work with different types", () => {
		const logs: string[] = []
		const logTap = tap<string>(x => logs.push(`Logged: ${x}`))
		
		const result = logTap("hello")
		
		assertEquals(result, "hello")
		assertEquals(logs, ["Logged: hello"])
	})
	
	it("should handle objects without modification", () => {
		const captured: any[] = []
		const objTap = tap(x => captured.push(x))
		
		const obj = { name: "Alice", age: 30 }
		const result = objTap(obj)
		
		assertEquals(result, obj)
		assertEquals(result === obj, true) // Same reference
		assertEquals(captured, [obj])
	})
	
	it("should ignore side effect return value", () => {
		const meaninglessTap = tap<number>(() => "ignored")
		
		const result = meaninglessTap(123)
		
		assertEquals(result, 123)
	})
	
	it("should work in function composition", () => {
		const double = (x: number) => x * 2
		const logs: number[] = []
		const logTap = tap<number>(x => logs.push(x))
		
		// Simulate pipe composition
		const value = 5
		const step1 = double(value)      // 10
		const step2 = logTap(step1)      // logs 10, returns 10
		const step3 = double(step2)      // 20
		
		assertEquals(step3, 20)
		assertEquals(logs, [10])
	})
	
	it("should handle errors in side effect gracefully", () => {
		const errorTap = tap<number>(() => {
			throw new Error("Side effect error")
		})
		
		// The tap function doesn't catch errors, but the user should
		let caught = false
		try {
			errorTap(42)
		} catch {
			caught = true
		}
		
		assertEquals(caught, true)
	})
})