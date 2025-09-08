import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.217.0/testing/bdd.ts"

import doTask, {
	fromPromise,
	delay,
	parallel,
	race
} from "../../../../libraries/toolkit/src/monads/doTask/index.ts"

describe("doTask", () => {
	describe("fromPromise", () => {
		it("should convert a promise to a task", async () => {
			const task = fromPromise(Promise.resolve(42))
			const result = await task()
			
			assertEquals(result, 42)
		})
		
		it("should handle rejected promises", async () => {
			const task = fromPromise(Promise.reject(new Error("test error")))
			
			let caught = false
			try {
				await task()
			} catch (error) {
				caught = true
				assertEquals((error as Error).message, "test error")
			}
			
			assertEquals(caught, true)
		})
	})
	
	describe("delay", () => {
		it("should delay execution", async () => {
			const start = Date.now()
			const task = delay(100)(42)
			const result = await task()
			const elapsed = Date.now() - start
			
			assertEquals(result, 42)
			assertEquals(elapsed >= 100, true)
		})
	})
	
	describe("parallel", () => {
		it("should run tasks in parallel", async () => {
			const task1 = delay(50)(1)
			const task2 = delay(50)(2)
			const task3 = delay(50)(3)
			
			const start = Date.now()
			const combined = parallel([task1, task2, task3])
			const results = await combined()
			const elapsed = Date.now() - start
			
			assertEquals(results, [1, 2, 3])
			// Should take ~50ms, not 150ms
			assertEquals(elapsed < 100, true)
		})
	})
	
	describe("race", () => {
		it("should return the first completed task", async () => {
			const slow = delay(100)(1)
			const fast = delay(10)(2)
			const medium = delay(50)(3)
			
			const raceTask = race([slow, fast, medium])
			const result = await raceTask()
			
			assertEquals(result, 2) // fast wins
		})
	})
	
	describe("doTask", () => {
		it("should chain async operations", async () => {
			const computation = doTask<number>(function* () {
				const x = yield fromPromise(Promise.resolve(5))
				const y = yield fromPromise(Promise.resolve(3))
				return x + y
			})
			
			const result = await computation()
			
			assertEquals(result, 8)
		})
		
		it("should handle sequential operations", async () => {
			const computation = doTask<string>(function* () {
				const a = yield delay(10)("Hello")
				const b = yield delay(10)(" ")
				const c = yield delay(10)("World")
				return a + b + c
			})
			
			const result = await computation()
			
			assertEquals(result, "Hello World")
		})
		
		it("should work with parallel operations", async () => {
			const computation = doTask<number>(function* () {
				const tasks = [
					fromPromise(Promise.resolve(1)),
					fromPromise(Promise.resolve(2)),
					fromPromise(Promise.resolve(3))
				]
				const results = yield parallel(tasks)
				return results.reduce((a: number, b: number) => a + b, 0)
			})
			
			const result = await computation()
			
			assertEquals(result, 6)
		})
		
		it("should handle errors properly", async () => {
			const computation = doTask<number>(function* () {
				const x = yield fromPromise(Promise.resolve(5))
				const y = yield fromPromise(Promise.reject(new Error("boom")))
				return x + y
			})
			
			let caught = false
			try {
				await computation()
			} catch (error) {
				caught = true
				assertEquals((error as Error).message, "boom")
			}
			
			assertEquals(caught, true)
		})
	})
})