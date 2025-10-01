import type {
	AstNode,
	ParseError,
	Result,
	Token,
} from "../../../types/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import createInitialState from "../createInitialState/index.ts"
import parseExpressionState from "../parseExpressionState/index.ts"

//++ Executes the state-based parser pipeline on tokenized input to produce an AST
export default function runStateParser(
	tokens: ReadonlyArray<Token>,
): Result<AstNode, ParseError> {
	const initialState = createInitialState(tokens)
	const parser = parseExpressionState()
	const result = evalState(parser)(initialState)

	return result
}
