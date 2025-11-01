import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import { UUID_SEGMENTS } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Checks if a UUID segment has valid length and contains only hexadecimal characters
//++ Returns error if segment is invalid, otherwise returns the accumulator
export default function _checkSegment(uuid: string) {
	return function checkSegmentWithUuid(
		acc: Result<ValidationError, string>,
	) {
		return function withSegment(
			segment: typeof UUID_SEGMENTS[number],
		): Result<ValidationError, string> {
			if (acc._tag === "Error") {
				return acc
			}

			//++ [EXCEPTION] .slice() permitted in Toolsmith for performance - provides UUID segment extraction wrapper
			const part = uuid.slice(segment.start, segment.end)

			if (part.length !== segment.length) {
				return error({
					code: "UUID_INVALID_SEGMENT_LENGTH",
					field: `uuid.${segment.name}`,
					messages: [
						`The system needs the ${segment.name} segment to have ${segment.length} characters.`,
					],
					received: uuid,
					expected:
						`${segment.length} hexadecimal digits in ${segment.name} segment`,
					suggestion:
						`Segment has ${part.length} characters, expected ${segment.length}`,
					constraints: { expectedLength: segment.length },
					severity: "requirement",
				})
			}

			const hexRegex = /^[0-9a-fA-F]+$/
			if (!hexRegex.test(part)) {
				return error({
					code: "UUID_INVALID_CHARACTER",
					field: `uuid.${segment.name}`,
					messages: [
						`The system only allows hexadecimal digits (0-9, a-f) in the ${segment.name} segment.`,
					],
					received: uuid,
					expected: "Hexadecimal digits (0-9, a-f, A-F)",
					suggestion: `Invalid character in ${segment.name} segment: '${part}'`,
					severity: "requirement",
				})
			}

			return acc
		}
	}
}
