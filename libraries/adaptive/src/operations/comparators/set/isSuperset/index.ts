// Use native Set; avoid external polyfills

import type {
	AdaptiveError,
	Either,
	IsSupersetComparator,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const IsSuperset = (op: IsSupersetComparator): OperationFunction<boolean> =>
async (arg: unknown, localValues?: LocalValues): Promise<Either<AdaptiveError[], boolean>> => {
	const operandFn = await composeComparators(op.operand as unknown as never)
	const testFn = await composeComparators(op.test as unknown as never)
	const operand = await operandFn(arg, localValues)
	const test = await testFn(arg, localValues)

	if (isLeft(operand)) return operand
	if (isLeft(test)) return test

	try {
		const left = new Set(operand.right as unknown as Iterable<unknown>)
		const right = new Set(test.right as unknown as Iterable<unknown>)

		const superset = Array.from(right.values()).every((v) => left.has(v))

	return superset ? operand : {
			left: [
		Error(op.tag)("IsSuperset")(
					`${JSON.stringify(operand.right)} is a superset of ${
						JSON.stringify(test.right)
					}`,
				),
			],
		}
	} catch (e) {
		return {
		left: [Error(op.tag)("IsSuperset")(`Error creating sets: ${e}`)],
		}
	}
}

export default IsSuperset
