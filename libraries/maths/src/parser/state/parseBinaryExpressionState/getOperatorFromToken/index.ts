import type { Token } from "../../../../types/index.ts"
import type { BinaryOperatorTokenType, Operator } from "../types/index.ts"

import { TOKEN_TO_OPERATOR_MAP } from "../constants/index.ts"

//++ Maps token types to binary operator symbols using object lookup
export default function getOperatorFromToken(
	token: Token,
): Operator | null {
	const { type } = token
	const upperType = type.toUpperCase() as BinaryOperatorTokenType

	return TOKEN_TO_OPERATOR_MAP[upperType] || null
}
