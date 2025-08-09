import Error from "../../../constructors/Error.js"

const castToString = (value) => {
	if (typeof value === "string") {
		return { right: value }
	}

	if (typeof value === "number") {
		return { right: String(value) }
	}

	if (typeof value === "boolean") {
		return { right: value ? "true" : "false" }
	}

	return {
		left: [
			Error(value)("castToString")(
				`Cannot cast ${JSON.stringify(value)} to a string.`,
			),
		],
	}
}

export default castToString
