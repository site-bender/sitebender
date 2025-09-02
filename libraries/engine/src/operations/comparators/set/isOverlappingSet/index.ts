// Use native Set; avoid external polyfills

import type {
	ComparatorConfig,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const IsOverlappingSet =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (arg: unknown, localValues?: LocalValues) => {
		const operandFn = await composeComparators(
			(op as unknown as { operand: unknown }).operand as never,
		)
		const testFn = await composeComparators(
			(op as unknown as { test: unknown }).test as never,
		)
		const operand = await operandFn(arg, localValues)
		const test = await testFn(arg, localValues)

		if (isLeft(operand)) return operand
		if (isLeft(test)) return test

		try {
			const leftArr = Array.isArray(operand.right)
				? operand.right as unknown[]
				: (typeof operand.right === "string" ? Array.from(operand.right) : [])
			const rightArr = Array.isArray(test.right)
				? test.right as unknown[]
				: (typeof test.right === "string" ? Array.from(test.right) : [])
			const left = new Set(leftArr)
			const right = new Set(rightArr)

			const overlaps = Array.from(left.values()).some((v) => right.has(v))

			return overlaps ? { right: true } : {
				left: [
					Error(op.tag)("IsOverlappingSet")(
						`${JSON.stringify(operand.right)} does not overlap with ${
							JSON.stringify(test.right)
						}`,
					),
				],
			}
		} catch (e) {
			return {
				left: [Error(op.tag)("IsOverlappingSet")(`Error creating sets: ${e}`)],
			}
		}
	}

export default IsOverlappingSet
