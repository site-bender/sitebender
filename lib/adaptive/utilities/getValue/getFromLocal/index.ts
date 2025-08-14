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
		const { local, id, name } = op.source || op.options || {}
		const key = local || id || name

		const right = localValues[key]

		if (isDefined(right)) {
			return { right }
		}

		return {
			left: [
				Error(op)("getFromLocal")(`Cannot find local value at key: ${key}.`),
			],
		}
	}

	return undefined
}

export default getFromLocal
