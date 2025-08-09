import { Temporal } from "temporal-polyfill"

import Error from "../../../constructors/Error.js"

const castToTime = (value) => {
	try {
		const t = Temporal.PlainTime.from(value)

		return { right: t }
	} catch (e) {
		return {
			left: [
				Error(value)("castToPlainTime")(
					`Cannot cast ${value} to a plain time: ${e.message}.`,
				),
			],
		}
	}
}

export default castToTime
