import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
	Value,
} from "../../types/index.ts"

import Error from "../../constructors/Error/index.ts"
import isNumber from "../../utilities/isNumber/index.ts"
import isUndefined from "../../utilities/isUndefined/index.ts"

interface HydratedConstant {
	tag: "Constant"
	type: "injector"
	datatype: string
	value: Value
}

const constant = (operation: HydratedConstant): OperationFunction =>
async (
	_arg: unknown,
	_localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, Value>> => {
	const { datatype, value } = operation

	if (value == null) {
		return { left: [Error(operation)("Constant")("Value is missing.")] }
	}

	if (datatype === "Number" || datatype === "Integer") {
		const num = isNumber(value) ? parseFloat(String(value)) : NaN

		return isUndefined(num) || Number.isNaN(num)
			? {
				left: [Error(operation)("Constant")("Value is not a number.")],
			}
			: {
				right: num,
			}
	}

	if (datatype === "String" && typeof value !== "string") {
		return {
			left: [Error(operation)("Constant")("Value is not a string.")],
		}
	}

	return { right: value }
}

export default constant
