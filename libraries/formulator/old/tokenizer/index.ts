import type { ParseError, Result, Token } from "../types/index.ts"

import tokenizeRecursive from "./tokenizeRecursive/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function tokenize(
	input: string,
): Result<Array<Token>, ParseError> {
	return tokenizeRecursive(input, 0, [])
}
