import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import isDefined from "../../utilities/isDefined"

const fromLocalStorage =
	(op = {}) =>
	async () => {
		const { datatype, key } = op
		const value = globalThis.localStorage?.getItem(key)

		const casted = castValue(datatype)(value)

		return isDefined(casted.right)
			? casted
			: Error(op)("FromLocalStorage")(casted.left)
	}

export default fromLocalStorage
