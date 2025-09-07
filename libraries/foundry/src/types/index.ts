import type { Result } from "@sitebender/toolkit/types/fp/result/index.ts"

// A seed for deterministic random generation
export type Seed = {
	readonly value: number
	readonly path: ReadonlyArray<number>
}

// An arbitrary generates values of type T from a seed
export type Arbitrary<T> = {
	readonly generate: (seed: Seed) => Result<T, GeneratorError>
	readonly shrink: (value: T) => ReadonlyArray<T>
}

// A property is a law that should hold for all generated inputs
export type Property<Arguments extends ReadonlyArray<unknown>> = {
	readonly name: string
	readonly arbitraries: { readonly [K in keyof Arguments]: Arbitrary<Arguments[K]> }
	readonly predicate: (arguments: Arguments) => boolean
}

// Configuration for property testing
export type Configuration = {
	readonly runs?: number
	readonly seed?: number
	readonly maximumShrinks?: number
	readonly timeout?: number
}

// Result of checking a property
export type PropertyResult = Result<PropertySuccess, PropertyFailure>

export type PropertySuccess = {
	readonly type: "success"
	readonly runs: number
	readonly seed: number
}

export type PropertyFailure = {
	readonly type: "failure"
	readonly counterexample: ReadonlyArray<unknown>
	readonly seed: number
	readonly shrinks: number
	readonly error?: string
}

// Errors that can occur during generation
export type GeneratorError =
	| { readonly type: "InvalidSeed"; readonly seed: unknown }
	| { readonly type: "GenerationFailed"; readonly reason: string }
	| { readonly type: "FilterExhausted"; readonly attempts: number }
	| { readonly type: "RecursionLimit"; readonly depth: number }