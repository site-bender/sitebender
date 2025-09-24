import type { HydratedRoot } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	ArchitectError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const root =
	({ radicand, index }: HydratedRoot): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<ArchitectError>, number>> => {
		const resolvedRadicand = await radicand(arg, localValues)
		if (isLeft(resolvedRadicand)) return resolvedRadicand

		const resolvedIndex = await index(arg, localValues)
		if (isLeft(resolvedIndex)) return resolvedIndex

		if (resolvedIndex.right === 0) {
			return {
				left: [
					{
						tag: "Error",
						operation: "Root",
						message: "The index of a root cannot be zero.",
					},
				],
			}
		}

		return {
			right: Math.sign(resolvedRadicand.right) *
				Math.pow(
					Math.abs(resolvedRadicand.right),
					1 / resolvedIndex.right,
				),
		}
	}

export default root
