/**
 * Returns the logical NOT of a value
 * 
 * @param value - The value to negate
 * @returns The logical negation of the value
 * @example
 * ```typescript
 * not(true) // false
 * not(false) // true
 * not("hello") // false
 * not("") // true
 * not(0) // true
 * ```
 */
const not = <T>(value: T): boolean => !value

export default not
