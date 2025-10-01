import type { Token } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"

//++ Creates initial parser state from tokenized input for pure functional parsing
export default function createInitialState(
	tokens: ReadonlyArray<Token>,
): ParserState {
	return {
		tokens,
		position: 0,
	}
}

//?? [EXAMPLE] createInitialState([{ type: "NUMBER", value: "42", position: 0 }])
//?? // { tokens: [...], position: 0 }
//?? [PRO] Pure function with no side effects - always returns the same output for same input
//?? [PRO] Immutable state means no mutations during parsing
//?? [GOTCHA] Position tracks array index, not character position in source
