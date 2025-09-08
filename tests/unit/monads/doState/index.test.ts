import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.217.0/testing/bdd.ts"

import doState, { get, put, modify } from "../../../../libraries/toolkit/src/monads/doState/index.ts"

describe("doState", () => {
	describe("get", () => {
		it("should retrieve current state", () => {
			const computation = doState<number, number>(function* () {
				const state = yield get()
				return state
			})
			
			const [result, finalState] = computation(42)
			
			assertEquals(result, 42)
			assertEquals(finalState, 42)
		})
	})
	
	describe("put", () => {
		it("should set new state", () => {
			const computation = doState<number, void>(function* () {
				yield put(100)
			})
			
			const [result, finalState] = computation(42)
			
			assertEquals(result, undefined)
			assertEquals(finalState, 100)
		})
	})
	
	describe("modify", () => {
		it("should transform state with function", () => {
			const computation = doState<number, void>(function* () {
				yield modify(x => x * 2)
			})
			
			const [result, finalState] = computation(21)
			
			assertEquals(result, undefined)
			assertEquals(finalState, 42)
		})
	})
	
	it("should chain state operations", () => {
		const computation = doState<number, string>(function* () {
			const initial = yield get()
			yield put(initial + 10)
			const afterPut = yield get()
			yield modify(x => x * 2)
			const final = yield get()
			return `${initial} -> ${afterPut} -> ${final}`
		})
		
		const [result, finalState] = computation(5)
		
		assertEquals(result, "5 -> 15 -> 30")
		assertEquals(finalState, 30)
	})
	
	it("should work with complex state types", () => {
		type Counter = { count: number; label: string }
		
		const increment = doState<Counter, number>(function* () {
			const state = yield get()
			yield put({
				count: state.count + 1,
				label: `Incremented to ${state.count + 1}`
			})
			const newState = yield get()
			return newState.count
		})
		
		const [result, finalState] = increment({ count: 0, label: "Initial" })
		
		assertEquals(result, 1)
		assertEquals(finalState, { count: 1, label: "Incremented to 1" })
	})
	
	it("should handle multiple sequential computations", () => {
		const add = (n: number) => doState<number, void>(function* () {
			yield modify(x => x + n)
		})
		
		const multiply = (n: number) => doState<number, void>(function* () {
			yield modify(x => x * n)
		})
		
		const combined = doState<number, number>(function* () {
			const addComp = add(5)
			const [, state1] = addComp(yield get())
			yield put(state1)
			
			const multComp = multiply(3)
			const [, state2] = multComp(yield get())
			yield put(state2)
			
			return yield get()
		})
		
		const [result, finalState] = combined(10)
		
		assertEquals(result, 45) // (10 + 5) * 3
		assertEquals(finalState, 45)
	})
})