//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

// ============================================================================
// Core Tuple Types
// ============================================================================

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Singleton<T> = [T]

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Pair<T, U> = [T, U]

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Triple<T, U, V> = [T, U, V]

// ============================================================================
// Type-level Extraction Utilities
// ============================================================================

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type First<T extends ReadonlyArray<unknown>> = T extends
	readonly [infer F, ...unknown[]] ? F : never

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Second<T extends ReadonlyArray<unknown>> = T extends
	readonly [unknown, infer S, ...unknown[]] ? S : never

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Third<T extends ReadonlyArray<unknown>> = T extends
	readonly [unknown, unknown, infer T, ...unknown[]] ? T : never

// ============================================================================
// Type-level Transformation Utilities
// ============================================================================

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type MapTuple<T extends ReadonlyArray<unknown>, U> = {
	[K in keyof T]: U
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Length<T extends ReadonlyArray<unknown>> = T["length"]

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Append<T extends ReadonlyArray<unknown>, U> = [...T, U]

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Prepend<T extends ReadonlyArray<unknown>, U> = [U, ...T]

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Tail<T extends ReadonlyArray<unknown>> = T extends
	readonly [unknown, ...infer Rest] ? Rest : []

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Reverse<T extends ReadonlyArray<unknown>> = T extends
	readonly [...infer Rest, infer Last] ? [Last, ...Reverse<Rest>]
	: []

// ============================================================================
// Type Guards
// ============================================================================

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type IsSingleton<T> = T extends Singleton<unknown> ? true : false

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type IsPair<T> = T extends Pair<unknown, unknown> ? true : false

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type IsTriple<T> = T extends Triple<unknown, unknown, unknown> ? true
	: false
