import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
	Value,
} from "@sitebender/engine-types/index.ts"

import isNumber from "@sitebender/engine/guards/isNumber/index.ts"

import Error from "../../constructors/Error/index.ts"
import isUndefined from "../../utilities/isUndefined.ts"

interface HydratedConstant {
	tag: "Constant"
	type: "injector"
	datatype: string
	value: Value
}

const constant = (operation: HydratedConstant): OperationFunction =>
(
	_arg: unknown,
	_localValues?: LocalValues,
): Promise<Either<Array<EngineError>, Value>> => {
	const { datatype, value } = operation

	if (value === null || value === undefined) {
		return Promise.resolve({
			left: [Error("Constant")("Constant")("Value is missing.")],
		})
	}

	if (datatype === "Number" || datatype === "Integer") {
		const num = isNumber(value) ? parseFloat(String(value)) : NaN

		return Promise.resolve(
			isUndefined(num) || Number.isNaN(num)
				? { left: [Error("Constant")("Constant")("Value is not a number.")] }
				: { right: num },
		)
	}

	if (datatype === "String" && typeof value !== "string") {
		return Promise.resolve({
			left: [Error("Constant")("Constant")("Value is not a string.")],
		})
	}

	return Promise.resolve({ right: value })
}

export default constant
