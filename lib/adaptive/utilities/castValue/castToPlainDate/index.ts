import { Temporal } from "temporal-polyfill"

import Error from "../../../constructors/Error.js"

const castToPlainDate = (value) => {
	try {
		const d = Temporal.PlainDate.from(value)

		return { right: d }
	} catch (e) {
		return {
			left: [
				Error(value)("castToPlainDate")(
					`Cannot cast ${value} to a plain date: ${e.message}.`,
				),
			],
		}
	}
}

export default castToPlainDate
