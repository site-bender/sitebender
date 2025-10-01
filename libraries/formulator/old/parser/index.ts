import type { AstNode, ParseError, Result, Token } from "../types/index.ts"

import parse from "./parse/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parser(
	tokens: Array<Token>,
): Result<AstNode, ParseError> {
	return parse(tokens)
}
