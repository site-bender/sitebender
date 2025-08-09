import Error from "../../../constructors/Error"
import isDefined from "../../isDefined.js"

const getFromLocal = (op) => (localValues) => {
	if (isDefined(localValues)) {
		const { id, local, name } = op.source || op.options || {}
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
