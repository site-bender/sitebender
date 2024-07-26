import Error from "../../../constructors/Error"

const parseJson = value => {
	try {
		return { right: JSON.parse(value) }
	} catch (e) {
		return {
			left: [Error(value)("parseJson")(`Cannot parse JSON: ${e}.`)],
		}
	}
}

export default parseJson
