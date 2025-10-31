import type { Ok } from "@sitebender/toolsmith/types/fp/result/index.ts"

import isObject from "@sitebender/toolsmith/predicates/isObject/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Discriminated Union Type Guard
 +
 + This example demonstrates:
 + - Using === operator to check discriminated union tag
 + - Accessing ._tag property for type narrowing
 + - Type predicate syntax (value is Ok<T>)
 + - Multiple checks combined (object + has property + tag match)
 +
 + PATTERN: Discriminated union guards use property access and ===
 + TYPE NARROWING: Enables TypeScript to know exact variant
 + MONADIC: Essential for Result monad type narrowing
 +
 + Type guard that checks if a Result is Ok (success case)
 */
export default function isOk<T = unknown>(
	value: unknown,
): value is Ok<T> {
	/*++
	 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
	 +
	 + WHY: This is a primitive type guard operation with no higher-level abstraction available.
	 + Discriminated unions are checked by examining their tag property.
	 +
	 + THREE CHECKS:
	 +
	 + 1. isObject(value)
	 +    - Use Toolsmith predicate to check if value is object
	 +    - Provides type narrowing: value is object
	 +    - Prevents accessing ._tag on primitives
	 +
	 + 2. "_tag" in value
	 +    - JavaScript 'in' operator checks property existence
	 +    - Narrows type to: object with _tag property
	 +    - Prevents accessing undefined property
	 +
	 + 3. value._tag === "Ok"
	 +    - [EXCEPTION] Using === to check tag value
	 +    - Narrows type to specific variant: Ok<T>
	 +    - External code uses this isOk() function, not manual checks
	 +
	 + CONSUMING CODE: Should use this isOk() function instead of manual checks
	 + CONSUMING CODE: import isOk from "@sitebender/toolsmith/monads/result/isOk"
	 +
	 + DISCRIMINATED UNION PATTERN:
	 + - Result<E, T> = Ok<T> | Error<E>
	 + - Ok<T> has { _tag: "Ok", value: T }
	 + - Error<E> has { _tag: "Error", error: E }
	 + - Checking ._tag determines which variant
	 +
	 + TYPE NARROWING:
	 + Before: value is unknown
	 + After isObject: value is object
	 + After "in" check: value is object with _tag
	 + After === check: value is Ok<T>
	 +
	 + EXHAUSTIVE CHECKING:
	 + if (isOk(result)) {
	 +   // result is Ok<T>
	 +   const value = result.value  // OK
	 + } else {
	 +   // result is Error<E>
	 +   const error = result.error  // OK
	 + }
	 +
	 + TypeScript ensures all cases handled!
	 */
	return isObject(value) && "_tag" in value && value._tag === "Ok"
}

//++ Example usage:
//++
//++ const result: Result<string, number> = ok(42)
//++
//++ if (isOk(result)) {
//++   // TypeScript now knows: result is Ok<number>
//++   console.log(result.value)  // 42 (type-safe access)
//++ } else {
//++   // TypeScript now knows: result is Error<string>
//++   console.log(result.error)  // Error message (type-safe)
//++ }
//++
//++ // Consuming code should NEVER write:
//++ // if (result._tag === "Ok") { }  // ❌ WRONG
//++ //
//++ // Instead always use:
//++ // if (isOk(result)) { }  // ✅ CORRECT
//++
//++ // Example with error:
//++ const errorResult: Result<string, number> = error("failed")
//++ isOk(errorResult)  // false
//++ isError(errorResult)  // true
