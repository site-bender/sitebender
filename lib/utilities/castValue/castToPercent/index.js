import { NUMBER_MATCHER } from "../../../constants"
import Error from "../../../constructors/Error"

const castToPercent = value => {
	if (NUMBER_MATCHER.test(String(value))) {
		return { right: parseFloat(String(value)) / 100 }
	}

	return {
		left: [
			Error(value)("castToPercent")(
				`Cannot cast ${JSON.stringify(value)} to a percent.`,
			),
		],
	}
}

export default castToPercent
