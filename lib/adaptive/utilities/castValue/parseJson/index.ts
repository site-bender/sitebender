import Error from "../../../constructors/Error.js"

const parseJson = (value) => {
	if (typeof value !== "string") {
		return { right: value }
	}

	try {
		return { right: JSON.parse(value) }
	} catch (e) {
		return {
			left: [Error(value)("parseJson")(`Cannot parse JSON: ${e}.`)],
		}
	}
}

export default parseJson
