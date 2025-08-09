import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import getFromLocal from "../../utilities/getValue/getFromLocal"
import isDefined from "../../utilities/isDefined.js"

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
