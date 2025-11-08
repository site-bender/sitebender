import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { Span, SwcSpan } from "../types/index.ts"
import type { SpanExtractionError } from "../types/errors/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

//++ Extract span from AST node with validation
//++ Returns Result with error if node lacks span or span has invalid values
//++ Validates: span exists, start >= 0, end >= 0, end >= start
//++
//++ @param node - AST node that may have a span property
//++ @returns Result<SpanExtractionError, Span>
//++
//++ Error kinds:
//++ - MissingSpan: node.span is undefined
//++ - NegativeValues: span.start or span.end is negative
//++ - InvalidRange: span.end < span.start
export default function _extractSpan(
	node: Readonly<{ span?: SwcSpan; type?: string }>,
): Result<SpanExtractionError, Span> {
	// Extract node type for error context
	const nodeType = node.type ?? "unknown"

	// Check if span exists
	if (node.span === undefined) {
		const baseError = createError("_extractSpan")([])(
			`AST node of type '${nodeType}' has no span property`,
		)("INVALID_ARGUMENT")

		const spanError: SpanExtractionError = {
			...baseError,
			kind: "MissingSpan",
			nodeType,
		}

		return error(spanError)
	}

	const span = node.span

	// Validate start and end are non-negative
	// [EXCEPTION] Using < operator because Toolsmith does not have lt() predicate yet
	if (or(span.start < 0)(span.end < 0)) {
		const baseError = createError("_extractSpan")([])(
			`Span has negative values: start=${span.start}, end=${span.end} for node type '${nodeType}'`,
		)("INVALID_ARGUMENT")

		const spanError: SpanExtractionError = {
			...baseError,
			kind: "NegativeValues",
			nodeType,
		}

		return error(spanError)
	}

	// Validate end >= start
	// [EXCEPTION] Using < operator because Toolsmith does not have lt() predicate yet
	if (span.end < span.start) {
		const baseError = createError("_extractSpan")([])(
			`Span has invalid range: end (${span.end}) < start (${span.start}) for node type '${nodeType}'`,
		)("INVALID_ARGUMENT")

		const spanError: SpanExtractionError = {
			...baseError,
			kind: "InvalidRange",
			nodeType,
		}

		return error(spanError)
	}

	// Return valid span
	return ok({
		start: span.start,
		end: span.end,
	})
}
