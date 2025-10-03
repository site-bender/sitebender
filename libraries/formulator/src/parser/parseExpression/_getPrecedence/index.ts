import type { BinaryOperator } from "../../types/index.ts"
import type { TokenType } from "../../../tokenizer/types/index.ts"

import { PRECEDENCE_LEVELS } from "../../constants/index.ts"

//++ Gets precedence level for a token type, returns -1 for non-operators
export default function getPrecedence(tokenType: TokenType): number {
	const binaryOperators: Record<TokenType, BinaryOperator | null> = {
		plus: "plus",
		minus: "minus",
		multiply: "multiply",
		divide: "divide",
		power: "power",
		number: null,
		identifier: null,
		leftParen: null,
		rightParen: null,
		comma: null,
		lessThan: null,
		greaterThan: null,
		lessThanOrEqual: null,
		greaterThanOrEqual: null,
		equalTo: null,
		notEqual: null,
		and: null,
		or: null,
		xor: null,
		implies: null,
		exclamation: null,
	}

	const operator = binaryOperators[tokenType]

	if (operator === null) {
		return -1
	}

	return PRECEDENCE_LEVELS[operator]
}
