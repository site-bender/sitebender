import type { Domain } from "../../types/branded/index.ts"

import all from "../../array/all/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"
import isError from "../../monads/result/isError/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import _validateDomainStructure from "../../newtypes/webTypes/domain/_validateDomainStructure/index.ts"
import _validateDomainLabel from "../../newtypes/webTypes/domain/_validateDomainLabel/index.ts"

//++ Type predicate that checks if a string is a valid domain name
export default function isDomain(value: string): value is Domain {
	const structureResult = _validateDomainStructure(value)

	if (isError(structureResult)) {
		return false
	}

	//++ [EXCEPTION] .split() permitted in Toolsmith for performance - provides domain validation wrapper
	const labels = value.split(".")
	const allLabelsValid = all((label: string) => isOk(_validateDomainLabel(label)))(labels)

	return isOk(allLabelsValid) ? getOrElse(false)(allLabelsValid) : false
}
