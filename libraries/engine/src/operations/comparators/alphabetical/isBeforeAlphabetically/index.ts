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

const isBeforeAlphabetically =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operandFn = await composeComparators(
			(op as unknown as { operand: unknown }).operand as never,
		)
		const testFn = await composeComparators(
			(op as unknown as { test: unknown }).test as never,
		)

		const operand = await operandFn(arg, localValues)
		if (isLeft(operand)) return operand

		const test = await testFn(arg, localValues)
		if (isLeft(test)) return test

		const left = String(operand.right)
		const right = String(test.right)
		return left.localeCompare(right) < 0
			? { right: operand.right as unknown as boolean }
			: {
				left: [
					Error(op.tag)("IsBeforeAlphabetically")(
						`${left} is not before ${right} alphabetically.`,
					),
				],
			}
	}

export default isBeforeAlphabetically
