/**
 * Type guard that checks if a value is a symbol primitive
 *
 * Determines whether a value is a symbol, a primitive data type introduced in ES6.
 * Symbols are unique and immutable identifiers often used for object property keys
 * to avoid naming collisions. Every symbol is unique, even if created with the same
 * description. This function uses typeof operator and provides TypeScript type narrowing.
 *
 * Symbol detection:
 * - Symbol(): Creates unique symbols
 * - Symbol("description"): Symbols with descriptions
 * - Symbol.for("key"): Global registry symbols
 * - Well-known symbols: Symbol.iterator, Symbol.hasInstance, etc.
 * - Not included: Symbol objects (Object(Symbol()))
 * - Type narrowing: provides TypeScript type guard
 *
 * @param value - The value to check
 * @returns True if the value is a symbol primitive, false otherwise
 * @example
 * ```typescript
 * // Basic checks
 * isSymbol(Symbol())            // true
 * isSymbol(Symbol("id"))        // true  
 * isSymbol(Symbol.for("global")) // true
 * isSymbol(Symbol.iterator)     // true
 * isSymbol("symbol")            // false
 * isSymbol(123)                 // false
 *
 * // Type narrowing
 * const getDescription = (value: unknown): string | undefined =>
 *   isSymbol(value) ? value.description : undefined
 *
 * // Global symbol checking
 * const isGlobalSymbol = (value: unknown): boolean =>
 *   isSymbol(value) && Symbol.keyFor(value) !== undefined
 *
 * // Filtering symbols
 * const mixed = [Symbol("a"), "text", 123, Symbol.iterator]
 * const symbols = mixed.filter(isSymbol)  // [Symbol(a), Symbol.iterator]
 * ```
 * @pure
 * @predicate
 */
const isSymbol = (value: unknown): value is symbol => typeof value === "symbol"

export default isSymbol
