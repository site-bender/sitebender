/*++
 + TOOLSMITH EXAMPLE: Type Guard Predicate
 +
 + This example demonstrates:
 + - Using native Array.isArray() method internally
 + - Type predicate syntax (value is ReadonlyArray<T>)
 + - Exception documentation for raw method usage
 + - How predicates enable TypeScript type narrowing
 +
 + PATTERN: Predicates can use raw operators/methods with documentation
 + EXTERNAL USE: Consuming code calls isArray(value) instead of Array.isArray(value)
 + TYPE NARROWING: After this check, TypeScript knows value is ReadonlyArray<T>
 +
 + Type guard that checks if a value is an Array using Array.isArray
 + [EXCEPTION] unknown is permitted in predicates for maximum flexibility
 */
export default function isArray<T = unknown>(value: unknown): value is ReadonlyArray<T> {
	/*++
	 + [EXCEPTION] Uses native Array.isArray() method by permission
	 +
	 + WHY: This is a primitive type guard operation with no higher-level abstraction available.
	 + Native Array.isArray() is the standard JavaScript way to check if something is an array.
	 +
	 + EXTERNAL CODE: Should use this isArray() function instead of Array.isArray()
	 + CONSUMING CODE: import isArray from "@sitebender/toolsmith/predicates/isArray"
	 +
	 + PERFORMANCE: Native method is optimized by JavaScript engines
	 + TYPE SAFETY: Provides TypeScript type narrowing (value is ReadonlyArray<T>)
	 +
	 + NOTE: We mark return type as ReadonlyArray<T> to enforce immutability
	 */
	return Array.isArray(value)
}

//++ Example usage:
//++
//++ const value: unknown = [1, 2, 3]
//++
//++ if (isArray(value)) {
//++   // TypeScript now knows: value is ReadonlyArray<unknown>
//++   // Can safely use array operations
//++   const length = value.length  // OK
//++ }
