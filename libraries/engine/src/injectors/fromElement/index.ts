import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
	Value,
} from "@sitebender/engine-types/index.ts"

import castValue from "@sitebender/engine/utilities/castValue/index.ts"
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

	const result = castValue(datatype)(getValue(op)(localValues))

	if (isDefined(result.left)) {
		return Promise.resolve({
			left: [Error("FromElement")("FromElement")(String(result.left))],
		})
	}

	return Promise.resolve(result)
}

export default fromElement
