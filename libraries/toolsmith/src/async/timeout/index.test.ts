import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import timeout from "./index.ts"

describe("timeout", () => {
	it("should be a curried function taking milliseconds", () => {
		const result = timeout(1000)

		expect(typeof result).toBe("function")
	})

	it("should return a function that executes a Promise that rejects", async () => {
		const timeoutPromise = timeout(100)

		expect(typeof timeoutPromise).toBe("function")

		const promise = timeoutPromise()

		expect(promise instanceof Promise).toBe(true)

		try {
			await promise
			expect(true).toBe(false) // Should not reach here
		} catch (error) {
			expect(error instanceof Error).toBe(true)
		}
	})

	it("should reject after specified milliseconds", async () => {
		const startTime = Date.now()
		const timeoutPromise = timeout(50)

		try {
			await timeoutPromise()
			expect(true).toBe(false) // Should not reach here
		} catch (_error) {
			const elapsed = Date.now() - startTime
			expect(elapsed).toBeGreaterThanOrEqual(45) // Allow 5ms tolerance
			expect(elapsed).toBeLessThan(100) // Should be much less than 100ms
		}
	})

	it("should reject with meaningful error message", async () => {
		const timeoutPromise = timeout(10)

		try {
			await timeoutPromise()
			expect(true).toBe(false) // Should not reach here
		} catch (error) {
			expect(error instanceof Error).toBe(true)
			if (error instanceof Error) {
				expect(error.message).toContain("10")
				expect(error.message.toLowerCase()).toContain("timeout")
			}
		}
	})

	it("should work with different timeout values", async () => {
		const timeout10 = timeout(10)
		const timeout20 = timeout(20)

		const start10 = Date.now()
		try {
			await timeout10()
		} catch (_error) {
			const elapsed10 = Date.now() - start10
			expect(elapsed10).toBeGreaterThanOrEqual(8)
			expect(elapsed10).toBeLessThan(30)
		}

		const start20 = Date.now()
		try {
			await timeout20()
		} catch (_error) {
			const elapsed20 = Date.now() - start20
			expect(elapsed20).toBeGreaterThanOrEqual(18)
			expect(elapsed20).toBeLessThan(40)
		}
	})

	it("should create independent timeout instances", async () => {
		const timeout1 = timeout(50)
		const timeout2 = timeout(50)

		// Both should reject independently
		const results = await Promise.allSettled([timeout1(), timeout2()])

		expect(results[0].status).toBe("rejected")
		expect(results[1].status).toBe("rejected")
	})

	it("should handle zero milliseconds", async () => {
		const timeoutPromise = timeout(0)

		try {
			await timeoutPromise()
			expect(true).toBe(false)
		} catch (error) {
			expect(error instanceof Error).toBe(true)
		}
	})

	it("should handle very large timeout values", () => {
		// Just verify it doesn't throw when creating
		const timeoutPromise = timeout(1000000)

		expect(typeof timeoutPromise).toBe("function")
	})
})
