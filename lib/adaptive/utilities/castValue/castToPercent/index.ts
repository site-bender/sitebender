import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

const castToPercent = (value) => {
	if (MATCHERS.number.test(String(value))) {
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
