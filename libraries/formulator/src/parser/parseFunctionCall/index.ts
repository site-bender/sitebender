import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import increment from "@sitebender/toolsmith/vanilla/math/increment/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import lt from "@sitebender/toolsmith/vanilla/validation/lt/index.ts"

import type { Token } from "../../tokenizer/types/index.ts"
import type { AstNode } from "../types/index.ts"

type ExpressionParser = (
	tokens: Array<Result<string, Token>>,
) => (
	position: number,
	minPrecedence?: number,
) => Result<string, [AstNode, number]>

let parseExpression: ExpressionParser | null = null

//++ Sets the expression parser reference for parsing function arguments
export function setExpressionParser(parser: ExpressionParser): void {
	parseExpression = parser
}

//++ Parses function call from token stream (curried, data-last)
export default function parseFunctionCall(
	tokens: Array<Result<string, Token>>,
) {
	return function parseFunctionCallWithPosition(
		position: number,
	): Result<string, [AstNode, number]> {
		if (lt(length(tokens))(position)) {
			const tokenResult = tokens[position]

			if (tokenResult._tag === "Ok") {
				const token = tokenResult.value

				if (token.type === "identifier") {
					const functionName = token.value
					const nextPosition = increment(position)

					if (lt(length(tokens))(nextPosition)) {
						const parenResult = tokens[nextPosition]

						if (parenResult._tag === "Ok") {
							const parenToken = parenResult.value

							if (parenToken.type === "leftParen") {
								if (parseExpression === null) {
									return error("Expression parser not initialized")
								}

								let currentPosition = increment(nextPosition)
								const argumentsList: Array<AstNode> = []

								if (lt(length(tokens))(currentPosition)) {
									const nextTokenResult = tokens[currentPosition]

									if (nextTokenResult._tag === "Ok") {
										const nextToken = nextTokenResult.value

										if (nextToken.type === "rightParen") {
											const astNode: AstNode = Object.freeze({
												_tag: "functionCall",
												name: functionName,
												arguments: Object.freeze([]),
												position: token.position,
											})

											return ok([astNode, increment(currentPosition)])
										}
									}
								}

								/*++ [EXCEPTION]
								 | While loop is permitted for parsing argument list.
								 |
								 | **Rationale**: Iterating through comma-separated arguments
								 | is clearer with iteration than recursion for this case.
								 |
								 | **Purity guarantee**: Deterministic and side-effect free.
								 */
								while (lt(length(tokens))(currentPosition)) {
									const argumentResult = parseExpression(tokens)(
										currentPosition,
										0,
									)

									if (argumentResult._tag === "Error") {
										return argumentResult
									}

									const [argument, newPosition] = argumentResult.value
									argumentsList.push(argument)
									currentPosition = newPosition

									if (lt(length(tokens))(currentPosition)) {
										const separatorResult = tokens[currentPosition]

										if (separatorResult._tag === "Error") {
											return separatorResult
										}

										const separatorToken = separatorResult.value

										if (separatorToken.type === "comma") {
											currentPosition = increment(currentPosition)
											continue
										}

										if (separatorToken.type === "rightParen") {
											const astNode: AstNode = Object.freeze({
												_tag: "functionCall",
												name: functionName,
												arguments: Object.freeze(argumentsList),
												position: token.position,
											})

											return ok([astNode, increment(currentPosition)])
										}

										return error(
											`Expected comma or closing parenthesis at position ${currentPosition}, got ${separatorToken.type}`,
										)
									}

									return error(
										`Unexpected end of input, expected comma or closing parenthesis`,
									)
								}

								return error(
									`Unexpected end of input while parsing function arguments`,
								)
							}

							return error(
								`Expected opening parenthesis after function name at position ${nextPosition}, got ${parenToken.type}`,
							)
						}

						return parenResult
					}

					return error(`Unexpected end of input after function name`)
				}

				return error(
					`Expected function name, got ${token.type} at position ${position}`,
				)
			}

			return tokenResult
		}

		return error(`Unexpected end of input at position ${position}`)
	}
}
