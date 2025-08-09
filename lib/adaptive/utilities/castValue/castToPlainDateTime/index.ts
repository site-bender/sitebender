import { Temporal } from "temporal-polyfill"

import Error from "../../../constructors/Error.js"

const castToDateTime = (value) => {
	try {
		const dt = Temporal.PlainDateTime.from(value)

		return { right: dt }
	} catch (e) {
		return {
			left: [
				Error(value)("castToPlainDateTime")(
					`Cannot cast ${value} to a plain date-time: ${e}.`,
				),
			],
		}
	}
}

export default castToDateTime
