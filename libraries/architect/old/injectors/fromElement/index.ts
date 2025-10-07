import type {
	ArchitectError,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "@sitebender/architect-types/index.ts"

import castValue, {
	Either as CastEither,
} from "@sitebender/architect/utilities/castValue/index.ts"
import getValue from "@sitebender/architect/utilities/getValue/index.ts"

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
): Promise<Either<Array<ArchitectError>, Value>> => {
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

	// Map to the architect Either shape explicitly
	const rightVal = (result as { right: Value }).right
	return Promise.resolve({ right: rightVal } as Either<ArchitectError[], Value>)
}

export default fromElement
