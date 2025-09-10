import doState from "../../../../../../../toolkit/src/monads/doState/index.ts"
import err from "../../../../../../../toolkit/src/monads/result/err/index.ts"
import type { AstNode, ParseError, Result } from "../../../../../types/index.ts"
import type { Parser } from "../../../../types/state/index.ts"

//++ Handles error case when processing left node fails
export default function handleError(error: ParseError): Parser<Result<AstNode, ParseError>> {
	return doState(function errorHandler() {
		return err(error)
	})
}

//?? [EXAMPLE] handleError(parseError) returns Parser that yields error
//?? [PRO] Pure function that wraps error in Parser context
//?? [PRO] Maintains type safety with proper error propagation
//?? [GOTCHA] Only used when left node parsing fails unexpectedly