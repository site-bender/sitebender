import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

const castToInteger = (value) => {
	if (MATCHERS.integer.test(String(value))) {
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
