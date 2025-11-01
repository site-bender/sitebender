import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import {
	UUID_HYPHEN_POSITIONS,
	UUID_LENGTH,
	UUID_SEGMENTS,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"
import _checkHyphen from "@sitebender/toolsmith/newtypes/stringTypes/uuid/_validateUuidFormat/_checkHyphen/index.ts"
import _checkSegment from "@sitebender/toolsmith/newtypes/stringTypes/uuid/_validateUuidFormat/_checkSegment/index.ts"

//++ Validates UUID format per RFC 4122
//++ Checks length, hyphen positions, segment lengths, and hex characters
export default function _validateUuidFormat(
	uuid: string,
): Result<ValidationError, string> {
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides UUID validation wrapper
	if (uuid.length === 0) {
		return error({
			code: "UUID_EMPTY",
			field: "uuid",
			messages: ["The system needs a UUID."],
			received: uuid,
			expected: "Non-empty UUID in format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
			suggestion:
				"Provide a valid UUID like '550e8400-e29b-41d4-a716-446655440000'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .length and !== permitted in Toolsmith for performance - provides UUID validation wrapper
	if (uuid.length !== UUID_LENGTH) {
		return error({
			code: "UUID_INVALID_LENGTH",
			field: "uuid",
			messages: ["The system needs a UUID with exactly 36 characters."],
			received: uuid,
			expected: "String with exactly 36 characters (8-4-4-4-12 with hyphens)",
			suggestion:
				`UUID must be ${UUID_LENGTH} characters (received ${uuid.length})`,
			constraints: { length: UUID_LENGTH },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .reduce() permitted in Toolsmith for performance - provides UUID validation wrapper
	const checkHyphenInUuid = _checkHyphen(uuid)
	const hyphenError = UUID_HYPHEN_POSITIONS.reduce(
		function checkHyphenAtPosition(
			acc: Result<ValidationError, string>,
			pos: number,
		): Result<ValidationError, string> {
			return checkHyphenInUuid(acc)(pos)
		},
		ok(uuid) as Result<ValidationError, string>,
	)

	if (hyphenError._tag === "Error") {
		return hyphenError
	}

	const checkSegmentInUuid = _checkSegment(uuid)
	const segmentError = UUID_SEGMENTS.reduce(
		function checkSegmentInPosition(
			acc: Result<ValidationError, string>,
			segment: typeof UUID_SEGMENTS[number],
		): Result<ValidationError, string> {
			return checkSegmentInUuid(acc)(segment)
		},
		ok(uuid) as Result<ValidationError, string>,
	)

	return segmentError
}
