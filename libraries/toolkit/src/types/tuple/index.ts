/**
 * Type definitions for fixed-size tuple data structures
 * 
 * Tuples are fixed-length arrays with known types at each position.
 * They provide compile-time guarantees about array length and element types,
 * making them useful for functions that return multiple values, coordinates,
 * key-value pairs, and other fixed-size collections.
 */

// ============================================================================
// Core Tuple Types
// ============================================================================

/**
 * A one-element tuple (Singleton)
 * 
 * While a single-element tuple might seem unnecessary, it provides:
 * - Type-level guarantee of exactly one element
 * - Distinction from regular arrays that might be empty or have multiple elements
 * - Consistency with other tuple types for generic programming
 * - Self-documenting code when a function must return exactly one value in array form
 * 
 * @example
 * ```typescript
 * type UserId = Singleton<string>
 * const id: UserId = ["user-123"] // ✅ Exactly one ID
 * const ids: UserId = ["user-123", "user-456"] // ❌ Type error
 * ```
 */
export type Singleton<T> = [T]

/**
 * A two-element tuple (Pair)
 * 
 * The most common tuple type, useful for:
 * - Key-value pairs
 * - Coordinates (x, y)
 * - Result with error/success pairs
 * - Any binary relationship
 * 
 * @example
 * ```typescript
 * type KeyValue<K, V> = Pair<K, V>
 * const entry: KeyValue<string, number> = ["age", 30]
 * ```
 */
export type Pair<T, U> = [T, U]

/**
 * A three-element tuple (Triple)
 * 
 * Useful for:
 * - 3D coordinates (x, y, z)
 * - RGB color values
 * - Database rows with three fields
 * - Any ternary relationship
 * 
 * @example
 * ```typescript
 * type RGB = Triple<number, number, number>
 * const color: RGB = [255, 128, 0]
 * ```
 */
export type Triple<T, U, V> = [T, U, V]

// ============================================================================
// Type-level Extraction Utilities
// ============================================================================

/**
 * Extracts the first element type from a tuple
 * 
 * @example
 * ```typescript
 * type T1 = First<[string, number, boolean]> // string
 * type T2 = First<[number]> // number
 * type T3 = First<[]> // never
 * ```
 */
export type First<T extends ReadonlyArray<any>> = 
	T extends readonly [infer F, ...any[]] ? F : never

/**
 * Extracts the second element type from a tuple
 * 
 * @example
 * ```typescript
 * type T1 = Second<[string, number, boolean]> // number
 * type T2 = Second<[string, number]> // number
 * type T3 = Second<[string]> // never
 * ```
 */
export type Second<T extends ReadonlyArray<any>> = 
	T extends readonly [any, infer S, ...any[]] ? S : never

/**
 * Extracts the third element type from a tuple
 * 
 * @example
 * ```typescript
 * type T1 = Third<[string, number, boolean]> // boolean
 * type T2 = Third<[string, number, boolean, Date]> // boolean
 * type T3 = Third<[string, number]> // never
 * ```
 */
export type Third<T extends ReadonlyArray<any>> = 
	T extends readonly [any, any, infer T, ...any[]] ? T : never

// ============================================================================
// Type-level Transformation Utilities
// ============================================================================

/**
 * Maps all elements of a tuple to a new type
 * 
 * @example
 * ```typescript
 * type T1 = MapTuple<[1, 2, 3], string> // [string, string, string]
 * type T2 = MapTuple<[true, false], number> // [number, number]
 * ```
 */
export type MapTuple<T extends ReadonlyArray<any>, U> = {
	[K in keyof T]: U
}

/**
 * Gets the length of a tuple as a literal number type
 * 
 * @example
 * ```typescript
 * type L1 = Length<[1, 2, 3]> // 3
 * type L2 = Length<[]> // 0
 * type L3 = Length<[string]> // 1
 * ```
 */
export type Length<T extends ReadonlyArray<any>> = T["length"]

/**
 * Appends a type to the end of a tuple
 * 
 * @example
 * ```typescript
 * type T1 = Append<[1, 2], 3> // [1, 2, 3]
 * type T2 = Append<[], string> // [string]
 * ```
 */
export type Append<T extends ReadonlyArray<any>, U> = [...T, U]

/**
 * Prepends a type to the beginning of a tuple
 * 
 * @example
 * ```typescript
 * type T1 = Prepend<[2, 3], 1> // [1, 2, 3]
 * type T2 = Prepend<[], string> // [string]
 * ```
 */
export type Prepend<T extends ReadonlyArray<any>, U> = [U, ...T]

/**
 * Gets all elements except the first (tail) of a tuple
 * 
 * @example
 * ```typescript
 * type T1 = Tail<[1, 2, 3]> // [2, 3]
 * type T2 = Tail<[1]> // []
 * type T3 = Tail<[]> // []
 * ```
 */
export type Tail<T extends ReadonlyArray<any>> = 
	T extends readonly [any, ...infer Rest] ? Rest : []

/**
 * Reverses the order of elements in a tuple
 * 
 * @example
 * ```typescript
 * type T1 = Reverse<[1, 2, 3]> // [3, 2, 1]
 * type T2 = Reverse<[string, number]> // [number, string]
 * ```
 */
export type Reverse<T extends ReadonlyArray<any>> = 
	T extends readonly [...infer Rest, infer Last]
		? [Last, ...Reverse<Rest>]
		: []

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Checks if a value is a Singleton tuple at the type level
 */
export type IsSingleton<T> = T extends Singleton<any> ? true : false

/**
 * Checks if a value is a Pair tuple at the type level
 */
export type IsPair<T> = T extends Pair<any, any> ? true : false

/**
 * Checks if a value is a Triple tuple at the type level
 */
export type IsTriple<T> = T extends Triple<any, any, any> ? true : false