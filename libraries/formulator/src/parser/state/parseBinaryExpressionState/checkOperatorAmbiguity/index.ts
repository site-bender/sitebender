import type { ParseError, Result, Token } from "../../../../types/index.ts"

import err from "../../../../../../toolsmith/src/monads/result/err/index.ts"
import ok from "../../../../../../toolsmith/src/monads/result/ok/index.ts"
import and from "../../../../../../toolsmith/src/vanilla/logic/and/index.ts"
import not from "../../../../../../toolsmith/src/vanilla/logic/not/index.ts"
import or from "../../../../../../toolsmith/src/vanilla/logic/or/index.ts"
import getOperatorFromToken from "../getOperatorFromToken/index.ts"

//++ Checks if two operators form an ambiguous sequence
export default function checkOperatorAmbiguity(
	currentOp: Token,
	nextToken: Token,
): Result<void, ParseError> {
	// Check for problematic sequences like "5 + + 3" or "5 - - 3"
	const isCurrentPlusOrMinus = or(currentOp.type === "PLUS")(
		currentOp.type === "MINUS",
	)
	const isNextPlusOrMinus = or(nextToken.type === "PLUS")(
		nextToken.type === "MINUS",
	)

	if (and(isCurrentPlusOrMinus)(isNextPlusOrMinus)) {
		return err({
			message:
				`Ambiguous operator sequence '${currentOp.value} ${nextToken.value}'. Use parentheses for clarity.`,
			position: nextToken.position,
			expected: "operand",
			found: nextToken.type,
		})
	}

	// Check for other invalid sequences like "5 * + 3"
	const nextOp = getOperatorFromToken(nextToken)
	const isValidSequence = and(Boolean(nextOp))(
		not(or(nextOp === "+")(nextOp === "-")),
	)

	if (isValidSequence) {
		return err({
			message:
				`Invalid operator sequence '${currentOp.value} ${nextToken.value}'`,
			position: nextToken.position,
			expected: "operand",
			found: nextToken.type,
		})
	}

	return ok(undefined)
}
