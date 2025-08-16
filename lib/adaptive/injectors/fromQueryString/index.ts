import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"
import getFromLocal from "../../utilities/getValue/getFromLocal/index.ts"
import isDefined from "../../utilities/isDefined/index.ts"
import isUndefined from "../../utilities/isUndefined.ts"

const fromQueryString = (op = {}) => async (_, localValues) => {
	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return local
	}

	const { datatype, key } = op

	const value = new URLSearchParams(window.location.search).get(key)

	if (isUndefined(value)) {
		return {
			left: [
				Error(op)("FromQueryString")(
					`Unable to find key "${key}" in URL search string.`,
				),
			],
		}
	}

	const casted = castValue(datatype)({ right: value })

	return isDefined(casted.right)
		? casted
		: { left: [Error(op)("FromQueryString")(casted.left)] }
}

export default fromQueryString
