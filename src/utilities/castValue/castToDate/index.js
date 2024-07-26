import Error from "../../../constructors/Error"

const castToDate = value => {
	try {
		const d = new Date(value)

		return { right: d.toISOString().substring(0, 10) }
	} catch (e) {
		return {
			left: [
				Error(value)("castToDate")(`Cannot cast ${value} to a date: ${e}.`),
			],
		}
	}
}

export default castToDate
