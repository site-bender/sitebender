import type { Result } from "@sitebender/toolsmith/types/fp/result"
import type { MessageParseError } from "../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok"
import error from "@sitebender/toolsmith/monads/result/error"

//++ [EXCEPTION] Parses JSON message safely, returning Result instead of throwing
//++ JSON.parse may throw - this is the ONE place we handle that exception
export default function _parseMessageSafely(
	data: string,
) {
	return function parseMessageSafelyWithData(): Result<
		MessageParseError,
		{ type: string; [key: string]: unknown }
	> {
		try {
			const parsed = JSON.parse(data)
			return ok<{ type: string; [key: string]: unknown }>(parsed)
		} catch (cause) {
			return error<MessageParseError>({
				_tag: "MessageParseError",
				data,
				cause,
			})
		}
	}
}
