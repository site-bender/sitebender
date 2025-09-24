import type { PropertyResult, Seed } from "../../../types/index.ts"

export type RunState = {
	readonly seed: Seed
	readonly result: PropertyResult | null
}

export type GeneratorState = {
	readonly seed: Seed
	readonly values: ReadonlyArray<unknown>
	readonly error: PropertyResult | null
}

export type ValuesResult = {
	readonly values: ReadonlyArray<unknown>
	readonly error: PropertyResult | null
}
