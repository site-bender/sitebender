import { INTEGER_MATCHER } from "../../../constants"
import Error from "../../../constructors/Error"

const castToInteger = value => {
	if (INTEGER_MATCHER.test(String(value))) {
		return { right: parseInt(String(value), 10) }
	}

	return {
		left: [
			Error(value)("castToInteger")(
				`Cannot cast ${JSON.stringify(value)} to an integer.`,
			),
		],
	}
}

export default castToInteger
