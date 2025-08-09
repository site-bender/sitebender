import Error from "../../constructors/Error"
import getFromLocal from "../../utilities/getValue/getFromLocal"
import isDefined from "../../utilities/isDefined.js"
import getByPattern from "./getByPattern"
import getBySegment from "./getBySegment"

const fromUrlParameter = (op = {}) => async (_, localValues) => {
	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return local
	}

	const {
		options: { pattern, segment },
	} = op

	if (isDefined(segment)) {
		return getBySegment(op)
	}

	if (isDefined(pattern)) {
		return getByPattern(op)
	}

	return {
		left: [Error(op)("FromUrlParameter")(`Invalid parameters.`)],
	}
}

export default fromUrlParameter
