import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.217.0/testing/bdd.ts"

import doMaybe, {
	None,
	Some,
	isNone,
	isSome,
	fromNullable,
	fromPredicate,
	getOrElse
} from "../../../../libraries/toolkit/src/monads/doMaybe/index.ts"

describe("doMaybe", () => {
	describe("constructors", () => {
		it("should create None values", () => {
			const none = None()
			
			assertEquals(isNone(none), true)
			assertEquals(isSome(none), false)
		})
		
		it("should create Some values", () => {
			const some = Some(42)
			
			assertEquals(isSome(some), true)
			assertEquals(isNone(some), false)
			if (isSome(some)) {
				assertEquals(some.value, 42)
			}
		})
	})
	
	describe("fromNullable", () => {
		it("should convert non-null to Some", () => {
			const result = fromNullable(42)
			
			assertEquals(isSome(result), true)
			if (isSome(result)) {
				assertEquals(result.value, 42)
			}
		})
		
		it("should convert null to None", () => {
			const result = fromNullable(null)
			
			assertEquals(isNone(result), true)
		})
		
		it("should convert undefined to None", () => {
			const result = fromNullable(undefined)
			
			assertEquals(isNone(result), true)
		})
		
		it("should handle zero and false as Some", () => {
			const zero = fromNullable(0)
			const falsy = fromNullable(false)
			
			assertEquals(isSome(zero), true)
			assertEquals(isSome(falsy), true)
		})
	})
	
	describe("fromPredicate", () => {
		it("should return Some when predicate is true", () => {
			const isPositive = fromPredicate<number>(x => x > 0)
			const result = isPositive(5)
			
			assertEquals(isSome(result), true)
			if (isSome(result)) {
				assertEquals(result.value, 5)
			}
		})
		
		it("should return None when predicate is false", () => {
			const isPositive = fromPredicate<number>(x => x > 0)
			const result = isPositive(-5)
			
			assertEquals(isNone(result), true)
		})
	})
	
	describe("getOrElse", () => {
		it("should extract value from Some", () => {
			const maybe = Some(42)
			const result = getOrElse(0)(maybe)
			
			assertEquals(result, 42)
		})
		
		it("should return default for None", () => {
			const maybe = None<number>()
			const result = getOrElse(0)(maybe)
			
			assertEquals(result, 0)
		})
	})
	
	describe("doMaybe", () => {
		it("should chain Some values", () => {
			const result = doMaybe<number>(function* () {
				const x = yield Some(5)
				const y = yield Some(3)
				return x + y
			})
			
			assertEquals(isSome(result), true)
			if (isSome(result)) {
				assertEquals(result.value, 8)
			}
		})
		
		it("should short-circuit on None", () => {
			const result = doMaybe<number>(function* () {
				const x = yield Some(5)
				const y = yield None()
				const z = yield Some(3) // Never reached
				return x + y + z
			})
			
			assertEquals(isNone(result), true)
		})
		
		it("should handle safe property access", () => {
			const getNestedProp = (obj: any) => doMaybe<string>(function* () {
				const user = yield fromNullable(obj?.user)
				const profile = yield fromNullable(user?.profile)
				const name = yield fromNullable(profile?.name)
				return name.toUpperCase()
			})
			
			const result1 = getNestedProp({ user: { profile: { name: "alice" } } })
			assertEquals(isSome(result1), true)
			if (isSome(result1)) {
				assertEquals(result1.value, "ALICE")
			}
			
			const result2 = getNestedProp({ user: null })
			assertEquals(isNone(result2), true)
			
			const result3 = getNestedProp({})
			assertEquals(isNone(result3), true)
		})
		
		it("should work with filtering", () => {
			const processNumber = (n: number) => doMaybe<string>(function* () {
				const positive = yield fromPredicate<number>(x => x > 0)(n)
				const even = yield fromPredicate<number>(x => x % 2 === 0)(positive)
				return `Even positive: ${even}`
			})
			
			const result1 = processNumber(4)
			assertEquals(isSome(result1), true)
			if (isSome(result1)) {
				assertEquals(result1.value, "Even positive: 4")
			}
			
			const result2 = processNumber(3) // Not even
			assertEquals(isNone(result2), true)
			
			const result3 = processNumber(-2) // Not positive
			assertEquals(isNone(result3), true)
		})
		
		it("should handle array operations", () => {
			const getFirstPositiveDouble = (numbers: number[]) => doMaybe<number>(function* () {
				const first = yield fromNullable(numbers[0])
				const positive = yield fromPredicate<number>(x => x > 0)(first)
				return positive * 2
			})
			
			const result1 = getFirstPositiveDouble([5, 10, 15])
			assertEquals(isSome(result1), true)
			if (isSome(result1)) {
				assertEquals(result1.value, 10)
			}
			
			const result2 = getFirstPositiveDouble([-5, 10, 15])
			assertEquals(isNone(result2), true)
			
			const result3 = getFirstPositiveDouble([])
			assertEquals(isNone(result3), true)
		})
		
		it("should combine with defaults", () => {
			type Config = { port: number; host: string; ssl: boolean }
			
			const parseConfig = (input: any) => doMaybe<Config>(function* () {
				const port = yield Some(getOrElse(3000)(fromNullable(input?.port)))
				const host = yield Some(getOrElse("localhost")(fromNullable(input?.host)))
				const ssl = yield Some(getOrElse(false)(fromNullable(input?.ssl)))
				return { port, host, ssl }
			})
			
			const result = parseConfig({ port: 8080 })
			assertEquals(isSome(result), true)
			if (isSome(result)) {
				assertEquals(result.value, { port: 8080, host: "localhost", ssl: false })
			}
		})
	})
})