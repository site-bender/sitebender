import type { AstNode, ParseError, Result } from "../../../../../types/index.ts"
import type { Parser } from "../../../../types/state/index.ts"

import doState, {
	get,
} from "../../../../../../../toolsmith/src/monads/doState/index.ts"
import err from "../../../../../../../toolsmith/src/monads/result/err/index.ts"
import parseBinaryLoop from "../../parseBinaryLoop/index.ts"

//++ Processes the left node by starting binary operation parsing loop
export default function processLeftNode(
	leftNode: AstNode,
	minPrecedence: number,
	parseBinaryWithPrecedence?: (
		minPrecedence: number,
	) => Parser<Result<AstNode, ParseError>>,
): Parser<Result<AstNode, ParseError>> {
	if (parseBinaryWithPrecedence) {
		return parseBinaryLoop(leftNode, minPrecedence, parseBinaryWithPrecedence)
	}

	// Fallback if no parser provided (shouldn't happen)
	return doState(function* fallbackHandler() {
		// touch state to satisfy generator signature
		yield get()
		return err({
			message: "No binary parser provided",
			position: 0,
			expected: "binary parser",
			found: "undefined",
		})
	})
}

//?? [EXAMPLE] processLeftNode(leftNode, 0, parser) starts binary parsing loop
//?? [PRO] Pure function that delegates to appropriate parser
//?? [PRO] Handles edge case when parser is not provided
//?? [GOTCHA] Requires parseBinaryWithPrecedence to be passed correctly
