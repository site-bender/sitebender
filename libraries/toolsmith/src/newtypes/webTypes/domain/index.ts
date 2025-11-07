import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/unsafeDomain/index.ts"
import _validateDomainStructure from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainStructure/index.ts"
import _validateDomainLabel from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainLabel/index.ts"
import _normalize from "@sitebender/toolsmith/newtypes/webTypes/_normalize/index.ts"

//++ Smart constructor that validates and creates a Domain value
//++ Validates RFC 1034/1035 format with RFC 1123 updates, normalizes to canonical lowercase form
//++ Supports internationalized domain names per RFC 5890
export default function domain(
	value: string,
): Result<ValidationError, Domain> {
	const structureResult = _validateDomainStructure(value)
	if (structureResult._tag === "Error") {
		return structureResult
	}

	//++ [EXCEPTION] .split() permitted in Toolsmith for performance - provides domain label extraction wrapper
	const labels = value.split(".")
	//++ [EXCEPTION] .reduce() permitted in Toolsmith for performance - provides domain label validation wrapper
	const labelError = labels.reduce(
		function validateLabel(
			acc: Result<ValidationError, string>,
			label: string,
		): Result<ValidationError, string> {
			if (acc._tag === "Error") {
				return acc
			}

			const labelResult = _validateDomainLabel(label)
			if (labelResult._tag === "Error") {
				return labelResult
			}

			return acc
		},
		ok(value) as Result<ValidationError, string>,
	)

	if (labelError._tag === "Error") {
		return labelError
	}

	const normalized = _normalize(value)
	return ok(unsafeDomain(normalized))
}
