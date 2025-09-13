import type { Either } from "../../types/fp/either/index.ts"

import doNotation from "../doNotation/index.ts"
import createEitherMonad from "./createEitherMonad/index.ts"

// Re-export commonly used Either functions for convenience in do-notation
export { default as Left } from "../either/left/index.ts"
export { default as Right } from "../either/right/index.ts"
export { default as isLeft } from "../either/isLeft/index.ts"
export { default as isRight } from "../either/isRight/index.ts"
export { default as fromNullable } from "../either/fromNullable/index.ts"
export { default as tryCatch } from "../either/tryCatch/index.ts"

//++ Specialized do-notation for Either monad with error handling
export default function doEither<L, R>(
	genFn: () => Generator<Either<L, unknown>, R, unknown>,
): Either<L, R> {
	return doNotation(createEitherMonad<L>())(genFn) as Either<L, R>
}

//?? [EXAMPLE] doEither(function* () { const x = yield Right(5); const y = yield Right(3); return x + y })
//?? [EXAMPLE] doEither(function* () { const x = yield Left("error"); return x }) // Short-circuits on Left
//?? [EXAMPLE] doEither(function* () { const x = yield fromNullable("missing")(getValue()); return x * 2 })
/*??
 | [EXAMPLE]
 | import doEither, { Left, Right, fromNullable, tryCatch } from "./doEither/index.ts"
 |
 | // Safe division
 | const safeDivide = (a: number, b: number) => doEither<string, number>(function* () {
 |   if (b === 0) {
 |     yield Left("Division by zero")
 |   }
 |   return a / b
 | })
 |
 | const result1 = safeDivide(10, 2)  // Right(5)
 | const result2 = safeDivide(10, 0)  // Left("Division by zero")
 |
 | // Chaining fallible operations
 | const parseAndDouble = (input: string) => doEither<string, number>(function* () {
 |   const parsed = yield tryCatch(
 |     () => JSON.parse(input),
 |     () => "Invalid JSON"
 |   )
 |
 |   const num = yield fromNullable("Missing number")(parsed.number)
 |
 |   if (typeof num !== "number") {
 |     yield Left("Not a number")
 |   }
 |
 |   return num * 2
 | })
 |
 | // Form validation pipeline
 | type ValidationError = { field: string; message: string }
 |
 | const validateForm = (data: any) => doEither<ValidationError, ValidForm>(function* () {
 |   const email = yield fromNullable({ field: "email", message: "Required" })(data.email)
 |
 |   if (!email.includes("@")) {
 |     yield Left({ field: "email", message: "Invalid format" })
 |   }
 |
 |   const age = yield fromNullable({ field: "age", message: "Required" })(data.age)
 |
 |   if (age < 18) {
 |     yield Left({ field: "age", message: "Must be 18+" })
 |   }
 |
 |   return { email, age }
 | })
 |
 | [GOTCHA] First Left value short-circuits entire computation
 | [GOTCHA] Error type must be consistent throughout
 | [PRO] Railway-oriented programming pattern
 | [PRO] Explicit error handling without try/catch
 | [PRO] Composable error handling
 | [NOTE] Re-exports common Either functions for convenience
 |
*/
