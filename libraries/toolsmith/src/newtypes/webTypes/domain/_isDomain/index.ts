import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

import _validateDomainStructure from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainStructure/index.ts"
import _validateDomainLabel from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainLabel/index.ts"

//++ Type predicate that checks if a string is a valid domain name
export default function _isDomain(value: string): value is Domain {
	const structureResult = _validateDomainStructure(value)
	if (structureResult._tag === "Error") {
		return false
	}

	const labels = value.split(".")
	for (const label of labels) {
		const labelResult = _validateDomainLabel(label)
		if (labelResult._tag === "Error") {
			return false
		}
	}

	return true
}
