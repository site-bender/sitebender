import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

const castToNumber = (value) => {
	if (MATCHERS.number.test(String(value))) {
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
