import type { AstNode, ParseError, Result } from "../../../../../types/index.ts"
import type { Parser } from "../../../../types/state/index.ts"

import doState, {
	get,
} from "../../../../../../../toolsmith/src/monads/doState/index.ts"
import err from "../../../../../../../toolsmith/src/monads/result/err/index.ts"

//++ Handles error case when processing left node fails
export default function handleError(
	error: ParseError,
): Parser<Result<AstNode, ParseError>> {
	return doState(function* errorHandler() {
		// touch state to make this a proper generator
		yield get()
		return err(error) as Result<AstNode, ParseError>
	})
}

//?? [EXAMPLE] handleError(parseError) returns Parser that yields error
//?? [PRO] Pure function that wraps error in Parser context
//?? [PRO] Maintains type safety with proper error propagation
//?? [GOTCHA] Only used when left node parsing fails unexpectedly
