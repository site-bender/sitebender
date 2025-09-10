import doState from "../../../../../toolkit/src/monads/doState/index.ts"
import ok from "../../../../../toolkit/src/monads/result/ok/index.ts"
import err from "../../../../../toolkit/src/monads/result/err/index.ts"
import { OPERATOR_INFO } from "../../../constants/index.ts"
import type {
	AstNode,
	ParseError,
	Result,
	Token,
} from "../../../types/index.ts"
import type { Parser, ParserState } from "../../types/state/index.ts"
import currentToken from "../currentToken/index.ts"
import advance from "../advance/index.ts"
import parseUnaryExpressionState from "../parseUnaryExpressionState/index.ts"

//++ Maps token types to binary operator symbols
function getOperatorFromToken(
	token: Token,
): "+" | "-" | "*" | "/" | "^" | "<" | ">" | "==" | "!=" | "<=" | ">=" | null {
	switch (token.type) {
		case "PLUS":
			return "+"
		case "MINUS":
			return "-"
		case "MULTIPLY":
			return "*"
		case "DIVIDE":
			return "/"
		case "POWER":
			return "^"
		case "LESS_THAN":
			return "<"
		case "GREATER_THAN":
			return ">"
		case "EQUAL":
			return "=="
		case "NOT_EQUAL":
			return "!="
		case "LESS_EQUAL":
			return "<="
		case "GREATER_EQUAL":
			return ">="
		default:
			return null
	}
}

//++ Checks if two operators form an ambiguous sequence
function checkOperatorAmbiguity(
	currentOp: Token,
	nextToken: Token,
): Result<void, ParseError> {
	// Check for problematic sequences like "5 + + 3" or "5 - - 3"
	if (
		(currentOp.type === "PLUS" || currentOp.type === "MINUS") &&
		(nextToken.type === "PLUS" || nextToken.type === "MINUS")
	) {
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
	if (nextOp && nextOp !== "+" && nextOp !== "-") {
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

//++ Parses binary expressions with precedence climbing using State monad
export default function parseBinaryExpressionState(
	parseExpression?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
): (minPrecedence: number) => Parser<Result<AstNode, ParseError>> {
	return function parseBinaryWithPrecedence(
		minPrecedence: number,
	): Parser<Result<AstNode, ParseError>> {
		return doState<ParserState, Result<AstNode, ParseError>>(function* () {
			// Parse left operand (could be unary expression)
			const leftResult = yield parseUnaryExpressionState(parseExpression)
			if (!leftResult.ok) {
				return leftResult
			}

			// Parse binary operators with precedence climbing
			let left = leftResult.value

			while (true) {
				const token = yield currentToken()
				const operator = getOperatorFromToken(token)

				// Check if this is a binary operator
				if (!operator) {
					return ok(left)
				}

				// Check operator precedence
				const info = OPERATOR_INFO[operator]
				if (info.precedence < minPrecedence) {
					return ok(left)
				}

				// Consume the operator
				yield advance()

				// Check for ambiguous operator sequences
				const nextToken = yield currentToken()
				const ambiguityResult = checkOperatorAmbiguity(token, nextToken)
				if (ambiguityResult._tag === "Left") {
					return ambiguityResult
				}

				// Calculate next minimum precedence for right side
				const nextMinPrecedence = info.associativity === "LEFT"
					? info.precedence + 1
					: info.precedence

				// Parse right side recursively
				const rightResult = yield parseBinaryWithPrecedence(nextMinPrecedence)
				if (rightResult._tag === "Left") {
					return rightResult
				}

				// Create binary node
				left = {
					type: "BinaryOp",
					operator,
					left,
					right: rightResult.right,
				}
			}
		})
	}
}

//?? [EXAMPLE] Parse "a + b * c" with precedence:
//?? parseBinaryExpressionState()(0) returns Parser that yields:
//?? BinaryOp("+", Variable("a"), BinaryOp("*", Variable("b"), Variable("c")))
//?? [PRO] Handles operator precedence and associativity correctly
//?? [PRO] State monad manages position tracking purely functionally
//?? [GOTCHA] Right-associative operators like ^ require special precedence handling
