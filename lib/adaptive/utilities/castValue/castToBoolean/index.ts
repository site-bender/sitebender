import Error from "../../../constructors/Error.js"

const castToBoolean = (value) => {
	if (typeof value === "boolean") {
		return { right: value }
	}

	if (typeof value === "string") {
		const val = value.toLocaleLowerCase()

		if (val === "t" || val === "true" || val === "yes") {
			return { right: true }
		}

		if (val === "f" || val === "false" || val === "no") {
			return { right: false }
		}
	}

	if (typeof value === "number") {
		if (value === 0) {
			return { right: false }
		}

		return { right: true }
	}

	return {
		left: [
			Error(value)("castToBoolean")(
				`Cannot cast ${JSON.stringify(value)} to a boolean.`,
			),
		],
	}
}

export default castToBoolean
