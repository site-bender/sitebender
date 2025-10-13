import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import increment from "@sitebender/toolsmith/math/increment/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import lt from "@sitebender/toolsmith/validation/lt/index.ts"

import type { Token } from "../../tokenizer/types/index.ts"
import type { AstNode } from "../types/index.ts"

type ExpressionParser = (
	tokens: Array<Result<string, Token>>,
) => (
	position: number,
	minPrecedence?: number,
) => Result<string, [AstNode, number]>

let parseExpression: ExpressionParser | null = null

//++ Sets the expression parser reference for grouped expressions
export function setExpressionParser(parser: ExpressionParser): void {
	parseExpression = parser
}

//++ Parses primary expression from token stream (curried, data-last)
export default function parsePrimary(tokens: Array<Result<string, Token>>) {
	return function parsePrimaryWithPosition(
		position: number,
	): Result<string, [AstNode, number]> {
		if (lt(length(tokens))(position)) {
			const tokenResult = tokens[position]

			if (tokenResult._tag === "Ok") {
				const token = tokenResult.value

				if (token.type === "number") {
					const astNode: AstNode = Object.freeze({
						_tag: "numberLiteral",
						value: Number.parseFloat(token.value),
						position: token.position,
					})

					return ok([astNode, increment(position)])
				}

				if (token.type === "identifier") {
					const astNode: AstNode = Object.freeze({
						_tag: "variable",
						name: token.value,
						position: token.position,
					})

					return ok([astNode, increment(position)])
				}

				if (token.type === "leftParen") {
					if (parseExpression === null) {
						return error("Expression parser not initialized")
					}

					const expressionResult = parseExpression(tokens)(
						increment(position),
						0,
					)

					if (expressionResult._tag === "Error") {
						return expressionResult
					}

					const [expression, nextPosition] = expressionResult.value

					if (lt(length(tokens))(nextPosition)) {
						const closingTokenResult = tokens[nextPosition]

						if (closingTokenResult._tag === "Error") {
							return closingTokenResult
						}

						const closingToken = closingTokenResult.value

						if (closingToken.type === "rightParen") {
							const astNode: AstNode = Object.freeze({
								_tag: "group",
								expression,
								position: token.position,
							})

							return ok([astNode, increment(nextPosition)])
						}

						return error(
							`Expected closing parenthesis at position ${nextPosition}, got ${closingToken.type}`,
						)
					}

					return error(`Unexpected end of input, expected closing parenthesis`)
				}

				return error(
					`Expected primary expression, got ${token.type} at position ${position}`,
				)
			}

			return tokenResult
		}

		return error(`Unexpected end of input at position ${position}`)
	}
}
