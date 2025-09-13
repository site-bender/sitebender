import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
	Value,
} from "@sitebender/engine-types/index.ts"

import castValue, {
	Either as CastEither,
} from "@sitebender/engine/utilities/castValue/index.ts"
import getValue from "@sitebender/engine/utilities/getValue/index.ts"

import Error from "../../constructors/Error/index.ts"
import isDefined from "../../utilities/isDefined.ts"

interface HydratedFromElement {
	tag: "FromElement"
	type: "injector"
	datatype: string
	source: string
}

const fromElement = (op: HydratedFromElement): OperationFunction =>
(
	_arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, Value>> => {
	const { datatype = "Number" } = op

	const result = castValue<unknown, Value>(datatype)(
		getValue(op)(localValues) as CastEither<unknown, Value>,
	)

	if ("left" in result && isDefined(result.left)) {
		return Promise.resolve({
			left: [
				Error("FromElement")("FromElement")(String(result.left)),
			],
		})
	}

	// Map to the engine Either shape explicitly
	const rightVal = (result as { right: Value }).right
	return Promise.resolve({ right: rightVal } as Either<EngineError[], Value>)
}

export default fromElement
