import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
	OperatorConfig,
} from "../../../types/index.ts"

import { ADDITION_IDENTITY } from "../../../constructors/constants/index.ts"
import Error from "../../../constructors/Error/index.ts"
import { isLeft } from "../../../../types/index.ts"

interface HydratedAdd {
	tag: "Add"
	type: "operator"
	datatype: string
	addends: Array<OperationFunction>
}

const add =
	({ addends, ...op }: HydratedAdd): OperationFunction<number | string> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, number | string>> => {
		const resolvedAddends = await Promise.all(
			addends.map((addend) => addend(arg, localValues)),
		)
		const errors = resolvedAddends.filter(isLeft)

		if (errors.length) {
			return {
				left: [
					Error(op)("Add")("Could not resolve all addends."),
					...errors.flatMap((e) => e.left),
				],
			}
		}

		const total = resolvedAddends.reduce(
			(acc, result) => acc + (result as { right: number | string }).right,
			ADDITION_IDENTITY,
		)

		return { right: total }
	}

export default add
