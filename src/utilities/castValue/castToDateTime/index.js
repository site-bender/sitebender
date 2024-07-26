import Error from "../../../constructors/Error"

const castToDateTime = value => {
	try {
		const d = new Date(value)

		if (Number.isNaN(d.valueOf())) {
			return {
				left: [
					Error(value)("castToDateTime")(
						`Cannot cast ${value} to a date/time: Invalid date.`,
					),
				],
			}
		}

		return { right: d }
	} catch (e) {
		return {
			left: [
				Error(value)("castToDateTime")(
					`Cannot cast ${value} to a date/time: ${e}.`,
				),
			],
		}
	}
}

export default castToDateTime
