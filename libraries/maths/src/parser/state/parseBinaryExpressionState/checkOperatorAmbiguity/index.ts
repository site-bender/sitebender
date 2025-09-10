import ok from "../../../../../../toolkit/src/monads/result/ok/index.ts"
import err from "../../../../../../toolkit/src/monads/result/err/index.ts"
import not from "../../../../../../toolkit/src/simple/logic/not/index.ts"
import and from "../../../../../../toolkit/src/simple/logic/and/index.ts"
import or from "../../../../../../toolkit/src/simple/logic/or/index.ts"
import type { ParseError, Result, Token } from "../../../../types/index.ts"
import getOperatorFromToken from "../getOperatorFromToken/index.ts"

//++ Checks if two operators form an ambiguous sequence
export default function checkOperatorAmbiguity(
	currentOp: Token,
	nextToken: Token,
): Result<void, ParseError> {
	// Check for problematic sequences like "5 + + 3" or "5 - - 3"
	const isCurrentPlusOrMinus = or(currentOp.type === "PLUS")(currentOp.type === "MINUS")
	const isNextPlusOrMinus = or(nextToken.type === "PLUS")(nextToken.type === "MINUS")
	
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
		not(or(nextOp === "+")(nextOp === "-"))
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