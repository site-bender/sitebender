import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Parses JSON string to unknown value
//++ Returns Result with parsed value or error if JSON is malformed
//++ [IO] Wraps JSON.parse() exception at IO boundary
export default function parseJson(
	jsonString: string,
): Result<ValidationError, unknown> {
	// Happy path: try to parse
	//++ [EXCEPTION] try/catch permitted in Toolsmith at IO boundary - wraps native JSON.parse exception
	try {
		//++ [EXCEPTION] JSON.parse() permitted in Toolsmith for performance - provides JSON parsing wrapper
		const parsed = JSON.parse(jsonString)
		return ok(parsed)
	} catch (err) {
		// Sad path: JSON is malformed
		//++ [EXCEPTION] instanceof and String() permitted in Toolsmith for error handling - provides type-safe error message extraction
		const errorMessage = err instanceof Error ? err.message : String(err)

		return error({
			code: "JSON_PARSE_ERROR",
			field: "jsonString",
			messages: [`System cannot parse the JSON string: ${errorMessage}`],
			received: jsonString,
			expected: "Valid JSON string",
			suggestion: "Ensure the string is properly formatted JSON",
			severity: "requirement",
		})
	}
}
