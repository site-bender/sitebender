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

import _nextUint32 from "../../../random/_nextUint32/index.ts"

//++ Generator for boolean values
const boolean: Generator<boolean> = {
	next: (seed: Seed): GeneratorResult<boolean> => {
		const { value, nextSeed } = _nextUint32(seed)
		// Use lowest bit for boolean decision
		return {
			value: (value & 1) === 1,
			nextSeed,
			size: 1, // Boolean has size 1
		}
	},

	shrink: (value: boolean): ShrinkTree<boolean> => {
		// true shrinks to false, false doesn't shrink
		return {
			value,
			children: () => value ? [{ value: false, children: () => [] }] : [],
		}
	},

	parse: (input: unknown): Result<ParseError, boolean> => {
		if (typeof input === "boolean") {
			return ok(input)
		}
		return err({
			type: "TypeMismatch",
			expected: "boolean",
			received: typeof input,
		})
	},
}

export default boolean
