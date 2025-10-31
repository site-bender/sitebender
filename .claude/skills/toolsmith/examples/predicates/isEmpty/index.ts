import isArray from "../isArray/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Boolean Predicate (Not a Type Guard)
 +
 + This example demonstrates:
 + - Using .length property access internally
 + - Using && operator for combining checks
 + - Defensive programming (check isArray first)
 + - Exception documentation for raw operators
 + - Returns plain boolean (not a type guard)
 +
 + PATTERN: Predicates return plain boolean, not wrapped in Result/Validation
 + EXTERNAL USE: Consuming code calls isEmpty(array) instead of array.length === 0
 + NOT A TYPE GUARD: Returns boolean, doesn't narrow types
 +
 + Checks if an array is empty (length === 0)
 + Returns false if non-array value is passed (defensive check)
 */
export default function isEmpty<T>(array: ReadonlyArray<T>): boolean {
	/*++
	 + [EXCEPTION] Direct .length access and && operator are permitted here because:
	 +
	 + REASONS:
	 + - TypeScript type signature guarantees array is ReadonlyArray<T>
	 + - Predicates are internal utilities for performance-critical paths
	 + - No validation needed (type system enforces correctness at compile time)
	 + - Using length() monad wrapper would add unnecessary Result unwrapping overhead
	 + - Runtime isArray check provides defensive safety for edge cases
	 +
	 + EXTERNAL CODE: Should use this isEmpty() function instead of .length === 0
	 + CONSUMING CODE: import isEmpty from "@sitebender/toolsmith/array/isEmpty"
	 +
	 + PERFORMANCE: Direct property access is single instruction, no function call overhead
	 + READABILITY: array.length === 0 is universally understood by JavaScript developers
	 +
	 + NOTE: We use isArray() check first for defensive programming, even though
	 + TypeScript guarantees the type. This protects against runtime type errors if
	 + consuming code bypasses type checking (e.g., using 'any' or type assertions)
	 */
	return isArray(array) && array.length === 0
}

//++ Example usage:
//++
//++ const myArray = [1, 2, 3]
//++
//++ if (isEmpty(myArray)) {
//++   // Array is empty
//++ } else {
//++   // Array has elements
//++ }
//++
//++ // Consuming code should NEVER write:
//++ // if (myArray.length === 0) { }  // ❌ WRONG
//++ //
//++ // Instead always use:
//++ // if (isEmpty(myArray)) { }  // ✅ CORRECT
