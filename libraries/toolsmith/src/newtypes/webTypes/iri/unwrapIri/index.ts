import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Iri } from "../../../../types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isIri from "../../../../predicates/isIri/index.ts"

//++ Extracts the raw string value from an Iri branded type
//++ Performs runtime check to ensure value is actually an Iri
//++ Returns Error if value is not an Iri (should never happen with correct typing)
export default function unwrapIri(value: Iri): Result<ValidationError, string> {
	if (!isIri(value)) {
		return error({
			code: "UNWRAP_IRI_INVALID_TYPE",
			field: "iri",
			messages: ["The system needs an IRI value."],
			received: value,
			expected: "Iri branded type",
			suggestion: "Ensure the value is a properly branded Iri type",
			severity: "requirement",
		})
	}
	return ok(value)
}
