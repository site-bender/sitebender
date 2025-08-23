import type { HydratedRoot } from "../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { isLeft } from "../../../types/index.ts"

const root =
	({ radicand, index, ...op }: HydratedRoot): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, number>> => {
		const resolvedRadicand = await radicand(arg, localValues)
		if (isLeft(resolvedRadicand)) return resolvedRadicand

		const resolvedDegree = await degree(arg, localValues)
		if (isLeft(resolvedDegree)) return resolvedDegree

		if (resolvedDegree.right === 0) {
			return {
				left: [Error(op)("Root")("The degree of a root cannot be zero.")],
			}
		}

		return {
			right: Math.sign(resolvedRadicand.right) *
				Math.pow(Math.abs(resolvedRadicand.right), 1 / resolvedDegree.right),
		}
	}

export default root
