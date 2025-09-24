// Use native Set; avoid external polyfills

import type {
	Either,
	ArchitectError,
	IsSubsetComparator,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const IsSubset = (op: IsSubsetComparator): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<ArchitectError[], boolean>> => {
	const operandFn = await composeComparators(op.operand as unknown as never)
	const testFn = await composeComparators(op.test as unknown as never)
	const operand = await operandFn(arg, localValues)
	const test = await testFn(arg, localValues)

	if (isLeft(operand)) return operand
	if (isLeft(test)) return test

	try {
		const left = new Set(operand.right as unknown as Iterable<unknown>)
		const right = new Set(test.right as unknown as Iterable<unknown>)

		const subset = Array.from(left.values()).every((v) => right.has(v))

		return subset ? { right: true } : {
			left: [
				Error(op.tag)("IsSubset")(
					`${JSON.stringify(operand.right)} is not a subset of ${
						JSON.stringify(test.right)
					}`,
				),
			],
		}
	} catch (e) {
		return {
			left: [Error(op.tag)("IsSubset")(`Error creating sets: ${e}`)],
		}
	}
}

export default IsSubset
