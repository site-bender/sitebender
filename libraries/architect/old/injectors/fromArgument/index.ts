import type {
	LocalValues,
	OperationFunction,
	Value,
} from "@sitebender/architect-types/index.ts"

import isNumber from "@sitebender/architect/guards/isNumber/index.ts"

import Error from "../../constructors/Error/index.ts"
import isUndefined from "../../utilities/isUndefined.ts"

interface FromArgumentOp {
	tag: "FromArgument"
	type: "injector"
	// We only need datatype hinting for basic casting in this injector
	datatype?: "Number" | "Integer" | string
	name?: string
}

const fromArgument = (
	op: FromArgumentOp = { tag: "FromArgument", type: "injector" },
): OperationFunction<Value> =>
(arg: unknown, _localValues?: LocalValues) => {
	const { datatype } = op

	if (arg === null || arg === undefined) {
		return Promise.resolve({
			left: [
				Error("FromArgument")("FromArgument")("Argument is missing."),
			],
		})
	}

	if (datatype === "Number" || datatype === "Integer") {
		const numeric = isNumber(arg as Value) ? parseFloat(String(arg)) : NaN

		return Promise.resolve(
			isUndefined(numeric) || Number.isNaN(numeric)
				? {
					left: [
						Error("FromArgument")("FromArgument")(
							"Value is not a number.",
						),
					],
				}
				: { right: numeric },
		)
	}

	return Promise.resolve({ right: arg as Value })
}

export default fromArgument
