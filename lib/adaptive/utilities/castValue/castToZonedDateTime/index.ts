import { Temporal } from "temporal-polyfill"

import Error from "../../../constructors/Error.js"

const castToZonedDateTime = (value) => {
	try {
		const zdt = Temporal.ZonedDateTime.from(value)

		return { right: zdt }
	} catch (e) {
		return {
			left: [
				Error(value)("castToZonedDateTime")(
					`Cannot cast ${value} to a zoned date-time: ${e}.`,
				),
			],
		}
	}
}

export default castToZonedDateTime
