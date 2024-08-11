import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import getFromLocal from "../../utilities/getValue/getFromLocal"
import isDefined from "../../utilities/isDefined"

const fromSessionStorage =
	(op = {}) =>
	async () => {
		const local = getFromLocal(op)

		if (isDefined(local)) {
			return local
		}

		const { datatype, key } = op
		const value = globalThis.sessionStorage?.getItem(key)

		const casted = castValue(datatype)(value)

		return isDefined(casted.right)
			? casted
			: Error(op)("FromSessionStorage")(casted.left)
	}

export default fromSessionStorage
