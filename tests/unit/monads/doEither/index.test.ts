import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.217.0/testing/bdd.ts"

import doEither, { 
	Left, 
	Right, 
	isLeft, 
	isRight, 
	fromNullable, 
	tryCatch 
} from "../../../../libraries/toolkit/src/monads/doEither/index.ts"

describe("doEither", () => {
	describe("constructors", () => {
		it("should create Left values", () => {
			const left = Left<string, number>("error")
			
			assertEquals(isLeft(left), true)
			assertEquals(isRight(left), false)
			assertEquals(left.value, "error")
		})
		
		it("should create Right values", () => {
			const right = Right<string, number>(42)
			
			assertEquals(isRight(right), true)
			assertEquals(isLeft(right), false)
			assertEquals(right.value, 42)
		})
	})
	
	describe("fromNullable", () => {
		it("should convert non-null to Right", () => {
			const result = fromNullable("missing")(42)
			
			assertEquals(isRight(result), true)
			if (isRight(result)) {
				assertEquals(result.value, 42)
			}
		})
		
		it("should convert null to Left", () => {
			const result = fromNullable("missing")(null)
			
			assertEquals(isLeft(result), true)
			if (isLeft(result)) {
				assertEquals(result.value, "missing")
			}
		})
		
		it("should convert undefined to Left", () => {
			const result = fromNullable("missing")(undefined)
			
			assertEquals(isLeft(result), true)
			if (isLeft(result)) {
				assertEquals(result.value, "missing")
			}
		})
	})
	
	describe("tryCatch", () => {
		it("should catch errors and return Left", () => {
			const result = tryCatch(
				() => { throw new Error("boom") },
				(e) => `Error: ${(e as Error).message}`
			)
			
			assertEquals(isLeft(result), true)
			if (isLeft(result)) {
				assertEquals(result.value, "Error: boom")
			}
		})
		
		it("should return Right for successful operations", () => {
			const result = tryCatch(
				() => 2 + 2,
				(e) => `Error: ${e}`
			)
			
			assertEquals(isRight(result), true)
			if (isRight(result)) {
				assertEquals(result.value, 4)
			}
		})
	})
	
	describe("doEither", () => {
		it("should chain Right values", () => {
			const result = doEither<string, number>(function* () {
				const x = yield Right(5)
				const y = yield Right(3)
				return x + y
			})
			
			assertEquals(isRight(result), true)
			if (isRight(result)) {
				assertEquals(result.value, 8)
			}
		})
		
		it("should short-circuit on Left", () => {
			const result = doEither<string, number>(function* () {
				const x = yield Right(5)
				const y = yield Left("error occurred")
				const z = yield Right(3) // Never reached
				return x + y + z
			})
			
			assertEquals(isLeft(result), true)
			if (isLeft(result)) {
				assertEquals(result.value, "error occurred")
			}
		})
		
		it("should handle validation pipeline", () => {
			const validateAge = (age: number) => doEither<string, number>(function* () {
				if (age < 0) {
					yield Left("Age cannot be negative")
				}
				if (age > 150) {
					yield Left("Age seems unrealistic")
				}
				return age
			})
			
			const result1 = validateAge(25)
			assertEquals(isRight(result1), true)
			if (isRight(result1)) {
				assertEquals(result1.value, 25)
			}
			
			const result2 = validateAge(-5)
			assertEquals(isLeft(result2), true)
			if (isLeft(result2)) {
				assertEquals(result2.value, "Age cannot be negative")
			}
			
			const result3 = validateAge(200)
			assertEquals(isLeft(result3), true)
			if (isLeft(result3)) {
				assertEquals(result3.value, "Age seems unrealistic")
			}
		})
		
		it("should work with fromNullable", () => {
			const computation = doEither<string, number>(function* () {
				const data: { value?: number } = { value: 42 }
				const x = yield fromNullable("missing value")(data.value)
				return x * 2
			})
			
			assertEquals(isRight(computation), true)
			if (isRight(computation)) {
				assertEquals(computation.value, 84)
			}
		})
		
		it("should handle complex error types", () => {
			type ValidationError = { field: string; message: string }
			
			const validate = (data: any) => doEither<ValidationError, { email: string; age: number }>(function* () {
				const email = yield fromNullable({ field: "email", message: "Required" })(data.email)
				
				if (!email.includes("@")) {
					yield Left({ field: "email", message: "Invalid format" })
				}
				
				const age = yield fromNullable({ field: "age", message: "Required" })(data.age)
				
				if (age < 18) {
					yield Left({ field: "age", message: "Must be 18 or older" })
				}
				
				return { email, age }
			})
			
			const result1 = validate({ email: "test@example.com", age: 25 })
			assertEquals(isRight(result1), true)
			
			const result2 = validate({ email: "invalid", age: 25 })
			assertEquals(isLeft(result2), true)
			if (isLeft(result2)) {
				assertEquals(result2.value, { field: "email", message: "Invalid format" })
			}
		})
	})
})