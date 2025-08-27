import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "@adaptiveTypes/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue from "@adaptiveSrc/utilities/castValue/index.ts"
import getValue from "@adaptiveSrc/utilities/getValue/index.ts"
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
): Promise<Either<Array<AdaptiveError>, Value>> => {
	const { datatype = "Number" } = op

	const result = castValue(datatype)(getValue(op)(localValues))

	if (isDefined(result.left)) {
		return Promise.resolve({ left: [Error("FromElement")("FromElement")(String(result.left))] })
	}

	return Promise.resolve(result)
}

export default fromElement
