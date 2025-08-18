import type {
	AdaptiveError,
	Either,
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import isDefined from "../../isDefined/index.ts"

const getFromLocal = (op: ElementConfig) =>
(
	localValues?: GlobalAttributes,
): Either<Array<AdaptiveError>, Value> | undefined => {
	if (isDefined(localValues)) {
		// Check direct properties first, then nested source/options
		const { local, id, name } = op.source || op.options || op
		const key = local || id || name

		// Check if localValues has the key, or if localValues.id matches
		const value = localValues[key] ?? 
			(op.id && localValues.id === op.id ? localValues.value : undefined) ??
			(op.name && localValues.name === op.name ? localValues.value : undefined)

		if (isDefined(value)) {
			return { right: value }
		}

		// Only return error if we expected to find something
		if (key && localValues[key] === undefined) {
			return undefined // Let it fall through to DOM
		}
	}

	return undefined
}

export default getFromLocal
