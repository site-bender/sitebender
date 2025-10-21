import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

import all from "@sitebender/toolsmith/array/all/index.ts"
import _validateDomainStructure from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainStructure/index.ts"
import _validateDomainLabel from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainLabel/index.ts"

//++ Type predicate that checks if a string is a valid domain name
export default function isDomain(value: string): value is Domain {
	const structureResult = _validateDomainStructure(value)
	if (structureResult._tag === "Error") {
		return false
	}

	const labels = value.split(".")
	const allLabelsValid = all((label: string) => _validateDomainLabel(label)._tag !== "Error")(labels)
	return allLabelsValid._tag === "Ok" ? allLabelsValid.value : false
}
