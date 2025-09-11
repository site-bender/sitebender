import type { AstNode, ParseError, Result } from "../../../../../types/index.ts"
import type { Parser } from "../../../../types/state/index.ts"

import processLeftNode from "../processLeftNode/index.ts"

//++ Wraps processLeftNode with the required parameters
export default function wrapProcessLeftNode(
	minPrecedence: number,
	parseBinaryWithPrecedence?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
) {
	return function (leftNode: AstNode): Parser<Result<AstNode, ParseError>> {
		return processLeftNode(leftNode, minPrecedence, parseBinaryWithPrecedence)
	}
}

//?? [EXAMPLE] wrapProcessLeftNode(0, parser)(leftNode) processes left node with precedence 0
//?? [PRO] Curried function for use with fold
//?? [PRO] Encapsulates parameter passing logic
//?? [GOTCHA] Must provide correct parseBinaryWithPrecedence function
