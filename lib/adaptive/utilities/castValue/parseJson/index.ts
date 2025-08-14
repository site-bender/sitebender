import type { AdaptiveError, Either, Value } from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

const parseJson = (value: string): Either<Array<AdaptiveError>, Value> => {
	if (!value) {
		return {
			left: [Error("parseJson")("JSON")(`Cannot parse JSON: empty value.`)],
		}
	}

	try {
		return { right: JSON.parse(value) }
	} catch (e) {
		return {
			left: [Error("parseJson")("JSON")(`Cannot parse JSON: ${e}.`)],
		}
	}
}

export default parseJson
