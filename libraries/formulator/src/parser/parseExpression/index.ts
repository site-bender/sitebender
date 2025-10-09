import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import increment from "@sitebender/toolsmith/vanilla/math/increment/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import lt from "@sitebender/toolsmith/vanilla/validation/lt/index.ts"

import type { Token } from "../../tokenizer/types/index.ts"
import type { AstNode } from "../types/index.ts"
import parsePrimary, {
	setExpressionParser as setPrimaryExpressionParser,
} from "../parsePrimary/index.ts"
import parseFunctionCall, {
	setExpressionParser as setFunctionCallExpressionParser,
} from "../parseFunctionCall/index.ts"
import parseUnaryOperator, {
	setPrimaryParser,
} from "../parseUnaryOperator/index.ts"
import { RIGHT_ASSOCIATIVE } from "../constants/index.ts"
import getPrecedence from "./_getPrecedence/index.ts"
import tokenTypeToBinaryOperator from "./_tokenTypeToBinaryOperator/index.ts"

//++ Parses expression with operator precedence using Pratt parsing (curried, data-last)
export default function parseExpression(tokens: Array<Result<string, Token>>) {
	return function parseExpressionWithPosition(
		position: number,
		minPrecedence = 0,
	): Result<string, [AstNode, number]> {
		const leftResult = parsePrefix(tokens)(position)

		if (leftResult._tag === "Error") {
			return leftResult
		}

		let [left, currentPosition] = leftResult.value

		/*++ [EXCEPTION]
		 | While loop is permitted for precedence climbing.
		 |
		 | **Rationale**: Pratt parser precedence climbing is naturally
		 | iterative. The while loop implements the standard algorithm.
		 |
		 | **Purity guarantee**: Deterministic and side-effect free.
		 */
		while (lt(length(tokens))(currentPosition)) {
			const tokenResult = tokens[currentPosition]

			if (tokenResult._tag === "Error") {
				return tokenResult
			}

			const token = tokenResult.value
			const precedence = getPrecedence(token.type)

			if (lt(minPrecedence)(precedence)) {
				break
			}

			const operatorResult = tokenTypeToBinaryOperator(token.type)

			if (operatorResult._tag === "Error") {
				break
			}

			const operator = operatorResult.value
			currentPosition = increment(currentPosition)

			const isRightAssociative = RIGHT_ASSOCIATIVE.has(operator)
			const nextPrecedence = isRightAssociative
				? precedence
				: increment(precedence)

			const rightResult = parseExpression(tokens)(
				currentPosition,
				nextPrecedence,
			)

			if (rightResult._tag === "Error") {
				return rightResult
			}

			const [right, newPosition] = rightResult.value
			currentPosition = newPosition

			left = Object.freeze({
				_tag: "binaryOperator",
				operator,
				left,
				right,
				position: left.position,
			})
		}

		return ok([left, currentPosition])
	}
}

//++ Parses prefix expression (primary, unary, or function call)
function parsePrefix(tokens: Array<Result<string, Token>>) {
	return function parsePrefixWithPosition(
		position: number,
	): Result<string, [AstNode, number]> {
		if (lt(length(tokens))(position)) {
			const tokenResult = tokens[position]

			if (tokenResult._tag === "Ok") {
				const token = tokenResult.value

				if (token.type === "identifier") {
					if (lt(length(tokens))(increment(position))) {
						const nextTokenResult = tokens[increment(position)]

						if (nextTokenResult._tag === "Ok") {
							const nextToken = nextTokenResult.value

							if (nextToken.type === "leftParen") {
								return parseFunctionCall(tokens)(position)
							}
						}
					}
				}
			}
		}

		return parseUnaryOperator(tokens)(position)
	}
}

setPrimaryParser(parsePrimary)
setPrimaryExpressionParser(parseExpression)
setFunctionCallExpressionParser(parseExpression)
