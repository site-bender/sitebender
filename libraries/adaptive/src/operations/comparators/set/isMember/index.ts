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

const IsMember = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
) => {
	const operandFn = await composeComparators((op as unknown as { operand: unknown }).operand as never)
	const testFn = await composeComparators((op as unknown as { test: unknown }).test as never)
	const operand = await operandFn(arg, localValues)
	const test = await testFn(arg, localValues)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) return test

	try {
		const right = new Set(test.right)

	return right.has(operand.right) ? { right: true } : {
			left: [
		Error(op.tag)("IsMember")(
					`${JSON.stringify(operand.right)} is not a member of ${
						JSON.stringify(test.right)
					}`,
				),
			],
		}
	} catch (e) {
		return {
	    left: [Error(op.tag)("IsMember")(`Error creating set: ${e}`)],
		}
	}
}

export default IsMember
