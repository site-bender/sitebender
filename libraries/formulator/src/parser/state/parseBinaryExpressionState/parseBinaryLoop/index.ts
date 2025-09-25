import type { AstNode, ParseError, Result } from "../../../../types/index.ts"
import type { Parser, ParserState } from "../../../types/state/index.ts"
import type { Operator } from "../types/index.ts"

import doState from "../../../../../../toolsmith/src/monads/doState/index.ts"
import fold from "../../../../../../toolsmith/src/monads/result/fold/index.ts"
import isError from "../../../../../../toolsmith/src/monads/result/isError/index.ts"
import ok from "../../../../../../toolsmith/src/monads/result/ok/index.ts"
import not from "../../../../../../toolsmith/src/vanilla/logic/not/index.ts"
import { OPERATOR_INFO } from "../../../../constants/index.ts"
import advance from "../../advance/index.ts"
import currentToken from "../../currentToken/index.ts"
import checkOperatorAmbiguity from "../checkOperatorAmbiguity/index.ts"
import getOperatorFromToken from "../getOperatorFromToken/index.ts"
import calculateNextMinPrecedence from "./calculateNextMinPrecedence/index.ts"
import createBinaryNode from "./createBinaryNode/index.ts"
import handleError from "./handleError/index.ts"

//++ Recursively parses binary operations with precedence climbing
export default function parseBinaryLoop(
	leftNode: AstNode,
	minPrecedence: number,
	parseBinaryWithPrecedence: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
): Parser<Result<AstNode, ParseError>> {
	return doState<ParserState, Result<AstNode, ParseError>>(
		function* parseBinaryLoopGenerator() {
			const token = yield currentToken()
			const operator = getOperatorFromToken(token)

			// Check if this is a binary operator
			if (not(Boolean(operator))) {
				return ok(leftNode)
			}

			// Check operator precedence
			const op = operator as Operator
			const info = OPERATOR_INFO[op as keyof typeof OPERATOR_INFO]
			if (info.precedence < minPrecedence) {
				return ok(leftNode)
			}

			// Consume the operator
			yield advance()

			// Check for ambiguous operator sequences
			const nextToken = yield currentToken()
			const ambiguityResult = checkOperatorAmbiguity(token, nextToken)
			if (isError(ambiguityResult)) {
				return ambiguityResult
			}

			// Calculate next minimum precedence for right side
			const nextMinPrecedence = calculateNextMinPrecedence(info.associativity)(
				info.precedence,
			)

			// Parse right side recursively
			const rightResult = yield parseBinaryWithPrecedence(nextMinPrecedence)
			if (isError(rightResult)) {
				return rightResult
			}

			// Create binary node and continue parsing
			const newLeft = fold<ParseError, AstNode>(handleError(leftNode))<AstNode>(
				createBinaryNode(op, leftNode),
			)(rightResult)

			// Continue parsing with the new left node
			return yield parseBinaryLoop(
				newLeft,
				minPrecedence,
				parseBinaryWithPrecedence,
			)
		},
	)
}

//?? [EXAMPLE] parseBinaryLoop(numberNode, 0, parser) continues parsing binary operations
//?? [PRO] Handles precedence climbing algorithm functionally
//?? [PRO] Uses toolsmith functions instead of raw operators
//?? [GOTCHA] Recursive function that can create deep call stacks
