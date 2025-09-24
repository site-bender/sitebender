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

//?? [EXAMPLE] runStateParser([{ type: "NUMBER", value: "42", position: 0 }])
//?? // Returns: { ok: true, value: { type: "Number", value: 42 } }
//?? [EXAMPLE] runStateParser([{ type: "UNKNOWN", value: "§", position: 0 }])
//?? // Returns: { ok: false, error: { message: "Unexpected token", position: 0 } }
//?? [PRO] Single entry point for complete parsing pipeline
//?? [PRO] Purely functional with no side effects or mutations
//?? [GOTCHA] Tokens must be pre-tokenized - this doesn't handle raw strings
