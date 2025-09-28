import type { Result } from "@sitebender/toolsmith/monads/result"

//++ [GROUP] Core PRNG types

//++ Seed for deterministic random number generation with dual state
export type Seed = {
	readonly state: number
	readonly stream: number
}

//++ [END]

//++ [GROUP] Generator protocol types

//++ Result of generation includes value, next seed, and size information
export type GeneratorResult<T> = {
	readonly value: T
	readonly nextSeed: Seed
	readonly size: number
}

//++ Lazy tree structure for efficient shrinking
export type ShrinkTree<T> = {
	readonly value: T
	readonly children: () => ReadonlyArray<ShrinkTree<T>>
}

//++ Core generator protocol with generation, shrinking, and optional parsing
export type Generator<T> = {
	readonly next: (seed: Seed) => GeneratorResult<T>
	readonly shrink: (value: T) => ShrinkTree<T>
	readonly parse?: (input: unknown) => Result<T, ParseError>
}

//++ [END]

//++ [GROUP] Pipeline composition types

//++ Pipeline stage that transforms generators
export type Stage<A, B> = (gen: Generator<A>) => Generator<B>

//++ [END]

//++ [GROUP] Effect system types

//++ Effect descriptor for property testing with multiple effect types
export type Effect<T> =
	| { readonly tag: "Pure"; readonly value: T }
	| { readonly tag: "Async"; readonly computation: () => Promise<T> }
	| { readonly tag: "IO"; readonly action: () => T }
	| { readonly tag: "Random"; readonly generator: Generator<T> }

//++ [END]

//++ [GROUP] Property testing types

//++ Property with effect-based predicate
export type Property<Args extends ReadonlyArray<unknown>> = {
	readonly name: string
	readonly generators: { readonly [K in keyof Args]: Generator<Args[K]> }
	readonly predicate: (args: Args) => Effect<boolean>
}

//++ Result of property checking
export type PropertyResult =
	| {
		readonly tag: "success"
		readonly runs: number
		readonly seed: Seed
		readonly duration?: number
	}
	| {
		readonly tag: "failure"
		readonly counterexample: ReadonlyArray<unknown>
		readonly minimal: ReadonlyArray<unknown>
		readonly shrinks: number
		readonly seed: Seed
		readonly duration?: number
		readonly error?: unknown
	}

//++ Resumable shrink state for long-running shrink operations
export type ShrinkState<T> = {
	readonly tree: ShrinkTree<T>
	readonly path: ReadonlyArray<number>
	readonly visited: Set<string>
}

//++ [END]

//++ [GROUP] Proof types

//++ Type-level proof witness
export type ProofOf<Kind extends string, Subject> = {
	readonly kind: Kind
	readonly subject: Subject
	readonly evidence: unknown
}

//++ Property proof with multiple guarantees
export type PropertyProof<Args extends ReadonlyArray<unknown>> = {
	readonly generators_deterministic: ProofOf<"deterministic", Args>
	readonly shrink_terminates: ProofOf<"terminating", Args>
	readonly shrink_sound: ProofOf<"sound", Args>
}

//++ Property with embedded correctness proof
export type ProvenProperty<Args extends ReadonlyArray<unknown>> = {
	readonly property: Property<Args>
	readonly proof: PropertyProof<Args>
}

//++ [END]

//++ [GROUP] Metamorphic testing types

//++ Transform one property into related properties
export type Metamorphic<
	A extends ReadonlyArray<unknown>,
	B extends ReadonlyArray<unknown>,
> = {
	readonly source: Property<A>
	readonly derive: (prop: Property<A>) => ReadonlyArray<Property<B>>
}

//++ [END]

//++ [GROUP] Error types

//++ Errors that can occur during generation
export type GeneratorError =
	| {
		readonly type: "InvalidSeed"
		readonly seed: unknown
		readonly reason?: string
	}
	| {
		readonly type: "InvalidBounds"
		readonly min: number
		readonly max: number
		readonly reason: string
	}
	| { readonly type: "FilterExhausted"; readonly attempts: number }
	| { readonly type: "RecursionLimit"; readonly depth: number }

//++ Errors that can occur during parsing
export type ParseError =
	| {
		readonly type: "TypeMismatch"
		readonly expected: string
		readonly received: string
	}
	| {
		readonly type: "ValidationFailed"
		readonly value: unknown
		readonly reason: string
	}
	| {
		readonly type: "FormatInvalid"
		readonly input: string
		readonly pattern: string
	}

//++ [END]

//?? [EXAMPLE] Creating a simple generator
//?? const boolGen: Generator<boolean> = {
//??   next: (seed) => ({ value: seed.state % 2 === 0, nextSeed: advanceSeed(seed), size: 1 }),
//??   shrink: (value) => ({ value, children: () => value ? [{ value: false, children: () => [] }] : [] })
//?? }

//?? [GOTCHA] The parse method is optional but enables bidirectional testing
//?? [GOTCHA] ShrinkTree children is a thunk for lazy evaluation - don't eagerly evaluate!
