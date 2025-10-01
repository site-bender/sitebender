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
