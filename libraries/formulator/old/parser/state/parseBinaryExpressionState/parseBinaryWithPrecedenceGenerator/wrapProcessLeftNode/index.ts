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
