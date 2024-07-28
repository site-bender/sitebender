import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import isDefined from "../../utilities/isDefined"
import isUndefined from "../../utilities/isUndefined"

const fromUrlParameter =
	(op = {}) =>
	() => {
		const { datatype, segment } = op
		const index = castValue("Integer")(segment)

		if (isDefined(index.left)) {
			return Error(op)("FromUrlParameter")("Segment is not an integer.")
		}

		const value = window.location.pathname.split("/").at(index.right)

		if (isUndefined(value)) {
			return Error(op)("FromUrlParameter")(
				`Unable to find value at segment ${segment} in URL path.`,
			)
		}

		const casted = castValue(datatype)(value)

		return isDefined(casted.right)
			? casted
			: Error(op)("FromUrlParameter")(casted.left)
	}

export default fromUrlParameter
