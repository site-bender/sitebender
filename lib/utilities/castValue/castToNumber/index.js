import { NUMBER_MATCHER } from "../../../constants"
import Error from "../../../constructors/Error"

const castToNumber = value => {
	if (NUMBER_MATCHER.test(String(value))) {
		return { right: parseFloat(String(value)) }
	}

	return {
		left: [
			Error(value)("castToNumber")(
				`Cannot cast ${JSON.stringify(value)} to a number.`,
			),
		],
	}
}

export default castToNumber
