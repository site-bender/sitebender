import type { State } from "../../../../../toolsmith/src/monads/state/state/index.ts"
import type { ParseError, Token } from "../../../types/index.ts"

//++ Parser state for pure functional parsing with immutable token navigation
export type ParserState = {
	readonly tokens: ReadonlyArray<Token>
	readonly position: number
}

//++ Parser computation that threads state and may produce values or errors
export type Parser<A> = State<ParserState, A>

//++ Result type for parser operations that can fail with positioned errors
export type ParserResult<A> = Parser<A | ParseError>
