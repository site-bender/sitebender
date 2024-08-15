import isDefined from "../../isDefined"

const getFromLocal = op => localValues => {
	if (isDefined(localValues)) {
		const { id, local, name } = op.source || op.options
		const key = local || id || name

		const right = localValues[key]

		if (isDefined(right)) {
			return { right }
		}
	}

	return undefined
}

export default getFromLocal
