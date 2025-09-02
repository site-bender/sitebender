import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isSameAlphabetically =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const leftFn = await composeComparators(
			(op as unknown as { operand: unknown }).operand as never,
		)
		const rightFn = await composeComparators(
			(op as unknown as { test: unknown }).test as never,
		)

		const left = await leftFn(arg, localValues)
		if (isLeft(left)) return left
		const right = await rightFn(arg, localValues)
		if (isLeft(right)) return right

		const l = String(left.right)
		const r = String(right.right)
		return l.localeCompare(r) === 0 ? { right: true } : {
			left: [
				Error(op.tag)("IsSameAlphabetically")(
					`"${l}" is not the same as "${r}" alphabetically.`,
				),
			],
		}
	}

export default isSameAlphabetically
