import isDefined from "../../isDefined"

const getFromLocal = op => {
	if (isDefined(globalThis._sitebender_)) {
		const { id, local, name } = op.source
		const key = local || id || name

		const right = globalThis._sitebender_[key]

		if (isDefined(right)) {
			return { right }
		}
	}

	return undefined
}

export default getFromLocal
