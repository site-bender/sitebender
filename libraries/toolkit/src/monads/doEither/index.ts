import doNotation from "../doNotation/index.ts"
import type { MonadDictionary } from "../doNotation/index.ts"

type Either<L, R> = { tag: "Left"; value: L } | { tag: "Right"; value: R }

function createEitherMonad<L>(): MonadDictionary<Either<L, any>> {
	return {
		chain: <A, B>(f: (a: A) => Either<L, B>) => (ma: Either<L, A>): Either<L, B> => {
			if (ma.tag === "Left") {
				return ma
			}
			return f(ma.value)
		},
		of: <R>(value: R): Either<L, R> => {
			return { tag: "Right", value }
		}
	}
}

//++ Either monad constructors and helpers
export function Left<L, R = never>(value: L): Either<L, R> {
	return { tag: "Left", value }
}

export function Right<L = never, R = unknown>(value: R): Either<L, R> {
	return { tag: "Right", value }
}

export function isLeft<L, R>(either: Either<L, R>): either is { tag: "Left"; value: L } {
	return either.tag === "Left"
}

export function isRight<L, R>(either: Either<L, R>): either is { tag: "Right"; value: R } {
	return either.tag === "Right"
}

export function fromNullable<L, R>(error: L) {
	return function checkNullable(value: R | null | undefined): Either<L, R> {
		return value === null || value === undefined
			? Left(error)
			: Right(value)
	}
}

export function tryCatch<L, R>(f: () => R, onError: (e: unknown) => L): Either<L, R> {
	try {
		return Right(f())
	} catch (error) {
		return Left(onError(error))
	}
}

//++ Specialized do-notation for Either monad with error handling
export default function doEither<L, R>(
	genFn: () => Generator<Either<L, any>, R, any>
): Either<L, R> {
	return doNotation(createEitherMonad<L>())(genFn)
}

//?? [EXAMPLE] doEither(function* () { const x = yield Right(5); const y = yield Right(3); return x + y })
//?? [EXAMPLE] doEither(function* () { const x = yield Left("error"); return x }) // Short-circuits on Left
//?? [EXAMPLE] doEither(function* () { const x = yield fromNullable("missing")(getValue()); return x * 2 })
/*??
 * [EXAMPLE]
 * // Safe division
 * const safeDivide = (a: number, b: number) => doEither<string, number>(function* () {
 *   if (b === 0) {
 *     yield Left("Division by zero")
 *   }
 *   return a / b
 * })
 * 
 * const result1 = safeDivide(10, 2)  // Right(5)
 * const result2 = safeDivide(10, 0)  // Left("Division by zero")
 * 
 * // Chaining fallible operations
 * const parseAndDouble = (input: string) => doEither<string, number>(function* () {
 *   const parsed = yield tryCatch(
 *     () => JSON.parse(input),
 *     () => "Invalid JSON"
 *   )
 *   
 *   const num = yield fromNullable("Missing number")(parsed.number)
 *   
 *   if (typeof num !== "number") {
 *     yield Left("Not a number")
 *   }
 *   
 *   return num * 2
 * })
 * 
 * // Form validation pipeline
 * type ValidationError = { field: string; message: string }
 * 
 * const validateForm = (data: any) => doEither<ValidationError, ValidForm>(function* () {
 *   const email = yield fromNullable({ field: "email", message: "Required" })(data.email)
 *   
 *   if (!email.includes("@")) {
 *     yield Left({ field: "email", message: "Invalid format" })
 *   }
 *   
 *   const age = yield fromNullable({ field: "age", message: "Required" })(data.age)
 *   
 *   if (age < 18) {
 *     yield Left({ field: "age", message: "Must be 18+" })
 *   }
 *   
 *   return { email, age }
 * })
 * 
 * [GOTCHA] First Left value short-circuits entire computation
 * [GOTCHA] Error type must be consistent throughout
 * [PRO] Railway-oriented programming pattern
 * [PRO] Explicit error handling without try/catch
 * [PRO] Composable error handling
 */