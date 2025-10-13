import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import increment from "@sitebender/toolsmith/math/increment/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import lt from "@sitebender/toolsmith/validation/lt/index.ts"

import type { Token } from "../../tokenizer/types/index.ts"
import type { AstNode } from "../types/index.ts"

type PrimaryParser = (
	tokens: Array<Result<string, Token>>,
) => (position: number) => Result<string, [AstNode, number]>

let parsePrimary: PrimaryParser | null = null

//++ Sets the primary parser reference for unary operator operands
export function setPrimaryParser(parser: PrimaryParser): void {
	parsePrimary = parser
}

//++ Parses unary operator expression from token stream (curried, data-last)
export default function parseUnaryOperator(
	tokens: Array<Result<string, Token>>,
) {
	return function parseUnaryOperatorWithPosition(
		position: number,
	): Result<string, [AstNode, number]> {
		if (lt(length(tokens))(position)) {
			const tokenResult = tokens[position]

			if (tokenResult._tag === "Ok") {
				const token = tokenResult.value

				if (token.type === "minus") {
					if (parsePrimary === null) {
						return error("Primary parser not initialized")
					}

					const operandResult = parsePrimary(tokens)(increment(position))

					if (operandResult._tag === "Error") {
						return operandResult
					}

					const [operand, nextPosition] = operandResult.value

					const astNode: AstNode = Object.freeze({
						_tag: "unaryOperator",
						operator: "negate",
						operand,
						position: token.position,
					})

					return ok([astNode, nextPosition])
				}
			}
		}

		if (parsePrimary === null) {
			return error("Primary parser not initialized")
		}

		const primaryResult = parsePrimary(tokens)(position)

		if (primaryResult._tag === "Error") {
			return primaryResult
		}

		const [primary, nextPosition] = primaryResult.value

		if (lt(length(tokens))(nextPosition)) {
			const postfixResult = tokens[nextPosition]

			if (postfixResult._tag === "Ok") {
				const postfixToken = postfixResult.value

				if (postfixToken.type === "exclamation") {
					const astNode: AstNode = Object.freeze({
						_tag: "unaryOperator",
						operator: "factorial",
						operand: primary,
						position: primary.position,
					})

					return ok([astNode, increment(nextPosition)])
				}
			}
		}

		return ok([primary, nextPosition])
	}
}
