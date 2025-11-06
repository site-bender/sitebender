import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { Position, Span } from "../types/index.ts"
import type { PositionExtractionError } from "../types/errors/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"

//++ Extract position from span with validation
//++ Returns Result with error if span has invalid values
//++ Validates: start >= 0, end >= 0, end >= start
//++
//++ @param span - Span with start and end byte offsets
//++ @returns Result<PositionExtractionError, Position>
//++
//++ Error kinds:
//++ - NegativeOffset: span.start or span.end is negative
//++ - InvalidSpan: span.end < span.start
export default function _extractPosition(
	span: Span,
): Result<PositionExtractionError, Position> {
	// Validate start and end are non-negative
	if (span.start < 0 || span.end < 0) {
		const baseError = createError("_extractPosition")([])(
			`Span has negative offset: start=${span.start}, end=${span.end}`,
		)("INVALID_ARGUMENT")

		const positionError: PositionExtractionError = {
			...baseError,
			kind: "NegativeOffset",
			span,
		}

		return error(positionError)
	}

	// Validate end >= start
	if (span.end < span.start) {
		const baseError = createError("_extractPosition")([])(
			`Span has invalid range: end (${span.end}) < start (${span.start})`,
		)("INVALID_ARGUMENT")

		const positionError: PositionExtractionError = {
			...baseError,
			kind: "InvalidSpan",
			span,
		}

		return error(positionError)
	}

	// Return position (simplified - uses byte offset as approximation)
	// In a real implementation, we'd convert byte offset to line/column
	return ok({
		line: 1,
		column: span.start,
	})
}
