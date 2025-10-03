import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { BinaryOperator } from "../../types/index.ts"
import type { TokenType } from "../../../tokenizer/types/index.ts"

//++ Converts token type to binary operator or returns error
export default function tokenTypeToBinaryOperator(
	tokenType: TokenType,
): Result<string, BinaryOperator> {
	if (tokenType === "plus") {
		return ok("plus")
	}

	if (tokenType === "minus") {
		return ok("minus")
	}

	if (tokenType === "multiply") {
		return ok("multiply")
	}

	if (tokenType === "divide") {
		return ok("divide")
	}

	if (tokenType === "power") {
		return ok("power")
	}

	return error(`Token type ${tokenType} is not a binary operator`)
}
