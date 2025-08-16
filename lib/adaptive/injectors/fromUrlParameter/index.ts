import Error from "../../constructors/Error/index.ts"
import getFromLocal from "../../utilities/getValue/getFromLocal/index.ts"
import isDefined from "../../utilities/isDefined.ts"
import getByPattern from "./getByPattern/index.ts"
import getBySegment from "./getBySegment/index.ts"

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
