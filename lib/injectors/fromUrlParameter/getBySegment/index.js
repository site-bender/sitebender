import Error from "../../../constructors/Error"
import castValue from "../../../utilities/castValue"
import isDefined from "../../../utilities/isDefined"
import isUndefined from "../../../utilities/isUndefined"

const getBySegment = op => {
	const {
		datatype,
		options: { segment },
	} = op
	const index = castValue("Integer")({ right: segment })

	if (isDefined(index.left)) {
		return {
			left: [Error(op)("FromUrlParameter")("Segment is not an integer.")],
		}
	}

	const value = window.location.pathname.split("/").at(index.right)

	if (isUndefined(value)) {
		return {
			left: [
				Error(op)("FromUrlParameter")(
					`Unable to find value at segment ${segment} in URL path.`,
				),
			],
		}
	}

	const casted = castValue(datatype)({ right: value })

	return isDefined(casted.right)
		? casted
		: { left: [Error(op)("FromUrlParameter")(casted.left)] }
}

export default getBySegment
