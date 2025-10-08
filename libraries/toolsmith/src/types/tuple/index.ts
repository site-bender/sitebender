// ============================================================================
// Core Tuple Types
// ============================================================================

export type Singleton<T> = [T]

export type Pair<T, U> = [T, U]

export type Triple<T, U, V> = [T, U, V]

// ============================================================================
// Type-level Extraction Utilities
// ============================================================================

export type First<T extends ReadonlyArray<unknown>> = T extends
	readonly [infer F, ...unknown[]] ? F : never

export type Second<T extends ReadonlyArray<unknown>> = T extends
	readonly [unknown, infer S, ...unknown[]] ? S : never

export type Third<T extends ReadonlyArray<unknown>> = T extends
	readonly [unknown, unknown, infer T, ...unknown[]] ? T : never

// ============================================================================
// Type-level Transformation Utilities
// ============================================================================

export type MapTuple<T extends ReadonlyArray<unknown>, U> = {
	[K in keyof T]: U
}

export type Length<T extends ReadonlyArray<unknown>> = T["length"]

export type Append<T extends ReadonlyArray<unknown>, U> = [...T, U]

export type Prepend<T extends ReadonlyArray<unknown>, U> = [U, ...T]

export type Tail<T extends ReadonlyArray<unknown>> = T extends
	readonly [unknown, ...infer Rest] ? Rest : []

export type Reverse<T extends ReadonlyArray<unknown>> = T extends
	readonly [...infer Rest, infer Last] ? [Last, ...Reverse<Rest>]
	: []

// ============================================================================
// Type Guards
// ============================================================================

export type IsSingleton<T> = T extends Singleton<unknown> ? true : false

export type IsPair<T> = T extends Pair<unknown, unknown> ? true : false

export type IsTriple<T> = T extends Triple<unknown, unknown, unknown> ? true
	: false
