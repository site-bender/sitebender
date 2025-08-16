import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"
import getFromLocal from "../../utilities/getValue/getFromLocal/index.ts"
import isDefined from "../../utilities/isDefined.ts"

const fromSessionStorage = (op) => async (_, localValues) => {
	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return local
	}

	const { datatype, key } = op
	const value = globalThis.sessionStorage?.getItem(key)

	if (value == null) {
		return {
			left: [
				Error(op)("FromSessionStorage")(`Value at key "${key}" not found.`),
			],
		}
	}

	const casted = castValue(datatype)({ right: value })

	return isDefined(casted.right)
		? casted
		: Error(op)("FromSessionStorage")(casted.left)
}

export default fromSessionStorage
