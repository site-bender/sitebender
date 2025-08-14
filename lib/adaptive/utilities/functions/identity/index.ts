/**
 * Identity function that returns its argument unchanged
 * 
 * @param a - The value to return
 * @returns The same value that was passed in
 * @example
 * ```typescript
 * identity(5) // 5
 * identity("hello") // "hello"
 * identity([1, 2, 3]) // [1, 2, 3]
 * ```
 */
const identity = <T>(a: T): T => a

export default identity
