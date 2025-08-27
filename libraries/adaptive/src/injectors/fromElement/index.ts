import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "@adaptiveTypes/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"
import getValue from "../../utilities/getValue/index.ts"
import isDefined from "../../utilities/isDefined.ts"

interface HydratedFromElement {
	tag: "FromElement"
	type: "injector"
	datatype: string
	source: string
}

const fromElement = (op: HydratedFromElement): OperationFunction =>
async (
	_arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, Value>> => {
	const { datatype = "Number" } = op

	const result = castValue(datatype)(getValue(op)(localValues))

	if (isDefined(result.left)) {
		return { left: [Error("FromElement")("FromElement")(String(result.left))] }
	}

	return result
}

export default fromElement
