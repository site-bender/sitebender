import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import { ADDITION_IDENTITY } from "../../../constructors/constants/index.ts"

interface HydratedAdd {
	tag: "Add"
	type: "operator"
	datatype: string
	addends: Array<OperationFunction>
}

const add =
	({ addends }: HydratedAdd): OperationFunction<number | string> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, number | string>> => {
		const resolvedAddends = await Promise.all(
			addends.map((addend) => addend(arg, localValues)),
		)

		const errors = resolvedAddends.filter(isLeft)
		if (errors.length) {
			const lefts = errors as Array<{ left: Array<AdaptiveError> }>
			const flattened: Array<AdaptiveError> = lefts.flatMap((e) => e.left)
			return {
				left: [
					{ tag: "Error", operation: "Add", message: "Could not resolve all addends." },
					...flattened,
				],
			}
		}

		const rights = resolvedAddends as Array<{ right: number | string }>
		const total = rights.reduce(
			(acc, { right }) => acc + Number(right),
			ADDITION_IDENTITY,
		)

		return { right: total }
	}

export default add
