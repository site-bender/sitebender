import type { Value } from "@sitebender/toolsmith/types/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Binary Curried Logic Function
 +
 + This example demonstrates:
 + - Using raw && operator internally
 + - Binary currying (two nested functions)
 + - Converting to boolean for guaranteed boolean return
 + - Exception documentation explaining this is the operator substitute
 +
 + PATTERN: Binary curried function takes two parameters via two function levels
 + EXTERNAL USE: THIS is what consuming code calls instead of using &&
 + CURRYING: and(left)(right) allows partial application
 +
 + Logical AND operation on two values
 + Returns boolean (not JavaScript && behavior which preserves types)
 +
 + IMPORTANT: JavaScript && returns the last truthy value or first falsy value.
 + This function converts both to boolean and returns true/false explicitly.
 */
export default function and(left: Value) {
	/*++
	 + CURRYING LEVEL 1: Capture left value in closure
	 +
	 + This outer function:
	 + - Takes the first parameter (left)
	 + - Returns a function that takes the second parameter
	 + - Creates a closure over left value
	 +
	 + NAMED FUNCTION: Inner function has meaningful name for debugging
	 */
	return function andWithLeft(right: Value): boolean {
		/*++
		 + [EXCEPTION] Using && operator for internal logic
		 +
		 + WHY: This function IS the operator substitute for logical AND.
		 + We implement the abstraction; we can't use ourselves recursively.
		 +
		 + EVERYWHERE ELSE: Use this `and` function or allPass() instead of &&
		 + CONSUMING CODE: import and from "@sitebender/toolsmith/logic/and"
		 +
		 + USAGE IN CONSUMING CODE:
		 + - if (and(condition1)(condition2)) { } instead of if (condition1 && condition2) { }
		 + - const isValid = and(hasName)(hasEmail) instead of hasName && hasEmail
		 +
		 + IMPORTANT: Convert both to boolean first for guaranteed boolean return
		 + - JavaScript && returns last truthy or first falsy value
		 + - We want consistent boolean return: true or false
		 + - Boolean(value) converts any value to true/false
		 +
		 + CURRYING BENEFITS:
		 + - Partial application: const hasNameAnd = and(hasName)
		 + - Composition: pipe(and(isString), and(isNotEmpty))
		 + - Function reuse: const checkBoth = and(check1)
		 */
		return Boolean(left) && Boolean(right)
	}
}

//++ Example usage in consuming code:
//++
//++ const isAuthenticated = true
//++ const hasPermission = true
//++
//++ // ❌ WRONG - never use && in consuming code:
//++ // if (isAuthenticated && hasPermission) { }
//++
//++ // ✅ CORRECT - use and() function:
//++ if (and(isAuthenticated)(hasPermission)) {
//++   // User is authenticated AND has permission
//++ }
//++
//++ // ✅ CORRECT - partial application:
//++ const isAuthenticatedAnd = and(isAuthenticated)
//++ if (isAuthenticatedAnd(hasPermission)) {
//++   // Same result, but can reuse isAuthenticatedAnd
//++ }
//++
//++ // ✅ CORRECT - with function results:
//++ if (and(isString(value))(isNotEmpty(value))) {
//++   // Value is string AND not empty
//++ }
