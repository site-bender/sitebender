import type { Value } from "@sitebender/toolsmith/types/index.ts"

/*++
 + TOOLSMITH EXAMPLE: The Canonical Exception Example
 +
 + This example demonstrates:
 + - Using raw ! operator internally
 + - This is THE operator substitute that consuming code uses
 + - Exception documentation explaining this is the ONLY permitted use
 + - Unary function (single parameter)
 +
 + PATTERN: Logic functions MUST use raw operators (they implement the substitutes)
 + EXTERNAL USE: THIS is what consuming code calls instead of using !
 + CRITICAL: This is the ONLY place ! operator is allowed
 +
 + Performs logical NOT operation on a value
 + Negates the truthiness of any value
 */
export default function not(value: Value): boolean {
	/*++
	 + [EXCEPTION] This is the ONLY permitted use of the ! operator
	 +
	 + WHY: This function IS the operator substitute for negation.
	 + We implement the abstraction; we can't use ourselves recursively.
	 +
	 + EVERYWHERE ELSE: Use this `not` function instead of !
	 + CONSUMING CODE: import not from "@sitebender/toolsmith/logic/not"
	 +
	 + USAGE IN CONSUMING CODE:
	 + - if (not(value)) { } instead of if (!value) { }
	 + - const isInvalid = not(isValid) instead of !isValid
	 +
	 + This is a UNARY function:
	 + - Takes one parameter: value
	 + - Returns boolean directly
	 + - No currying needed (already curried by definition)
	 +
	 + CRITICAL UNDERSTANDING:
	 + - In Toolsmith library: This file is the ONLY place ! is allowed
	 + - In consuming code: NEVER use ! operator, ALWAYS use not()
	 + - In other Toolsmith functions: Use this not() function if needed
	 */
	return !value
}

//++ Example usage in consuming code:
//++
//++ const isAuthenticated = true
//++
//++ // ❌ WRONG - never use ! in consuming code:
//++ // if (!isAuthenticated) { }
//++
//++ // ✅ CORRECT - use not() function:
//++ if (not(isAuthenticated)) {
//++   // User is not authenticated
//++ }
//++
//++ const isEmpty = true
//++ const isNotEmpty = not(isEmpty)  // ✅ CORRECT
