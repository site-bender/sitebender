import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type {
	Generator,
	GeneratorResult,
	ParseError,
	Seed,
	ShrinkTree,
} from "../../../types/index.ts"

import _boundedInt from "../../../random/_boundedInt/index.ts"
import advanceSeed from "../../../random/advanceSeed/index.ts"

//++ Configuration options for string generation
export type StringOptions = {
	readonly minLength?: number
	readonly maxLength?: number
	readonly charset?: string
}

const DEFAULT_CHARSET =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

//++ Creates a generator for strings with specified constraints
export default function string(options: StringOptions = {}): Generator<string> {
	const minLength = options.minLength ?? 0
	const maxLength = options.maxLength ?? 100
	const charset = options.charset ?? DEFAULT_CHARSET

	// Ensure min <= max
	const actualMin = Math.min(minLength, maxLength)
	const actualMax = Math.max(minLength, maxLength)

	return {
		next: (seed: Seed): GeneratorResult<string> => {
			// First, determine string length
			const lengthResult = _boundedInt(seed, actualMin, actualMax)
			if (lengthResult._tag === "Error") {
				return {
					value: "",
					nextSeed: advanceSeed(seed),
					size: 1,
				}
			}

			const length = lengthResult.value.value
			let currentSeed = lengthResult.value.nextSeed
			let result = ""

			// Generate each character
			for (let i = 0; i < length; i++) {
				const charResult = _boundedInt(currentSeed, 0, charset.length - 1)
				if (charResult._tag === "Error") {
					// On error, just advance seed and continue
					currentSeed = advanceSeed(currentSeed)
					continue
				}
				result += charset[charResult.value.value]
				currentSeed = charResult.value.nextSeed
			}

			return {
				value: result,
				nextSeed: currentSeed,
				size: 1,
			}
		},

		shrink: (value: string): ShrinkTree<string> => {
			if (value.length === 0) {
				return {
					value,
					children: () => [],
				}
			}

			const shrinks: ShrinkTree<string>[] = []

			// First shrink: empty string
			shrinks.push({
				value: "",
				children: () => [],
			})

			// Binary search shrinking on length
			if (value.length > 1) {
				// Half length
				const halfLength = Math.floor(value.length / 2)
				shrinks.push({
					value: value.slice(0, halfLength),
					children: () =>
						string(options).shrink(value.slice(0, halfLength)).children(),
				})
			}

			// Remove single character from end
			if (value.length > 1) {
				shrinks.push({
					value: value.slice(0, -1),
					children: () => string(options).shrink(value.slice(0, -1)).children(),
				})
			}

			return {
				value,
				children: () => shrinks,
			}
		},

		parse: (input: unknown): Result<ParseError, string> => {
			if (typeof input !== "string") {
				return err({
					type: "TypeMismatch",
					expected: "string",
					received: typeof input,
				})
			}
			if (input.length < actualMin || input.length > actualMax) {
				return err({
					type: "ValidationFailed",
					value: input,
					reason: `String length must be between ${actualMin} and ${actualMax}`,
				})
			}
			// Check charset if custom
			if (options.charset) {
				for (const char of input) {
					if (!charset.includes(char)) {
						return err({
							type: "ValidationFailed",
							value: input,
							reason: `Character '${char}' not in allowed charset`,
						})
					}
				}
			}
			return ok(input)
		},
	}
}
