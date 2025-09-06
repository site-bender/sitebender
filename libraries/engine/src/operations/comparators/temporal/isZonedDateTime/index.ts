import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "@sitebender/engine-types/index.ts"

import { isLeft } from "@sitebender/engine-types/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isZonedDateTime =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, boolean>> => {
		const operandFn = await composeComparators(
			(op as unknown as { operand: unknown }).operand as never,
		)
		const operand = await operandFn(arg, localValues)

		if (isLeft(operand)) return operand

		try {
			const s = String(operand.right)
			// Either RFC3339 with 'Z' or with offset or with [Zone]
			const RFC3339Z =
				/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z(?:\[[^\]]+\])?$/
			const RFC3339_OFFSET =
				/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?[+-]\d{2}:\d{2}(?:\[[^\]]+\])?$/
			return (RFC3339Z.test(s) || RFC3339_OFFSET.test(s))
				? { right: true }
				: {
					left: [
						Error(op.tag)("IsZonedDateTime")(
							`${
								JSON.stringify(operand.right)
							} is not a zoned date-time.`,
						),
					],
				}
		} catch (e) {
			return {
				left: [
					Error(op.tag)("IsZonedDateTime")(
						`${
							JSON.stringify(operand.right)
						} is not a zoned date-time: ${e}`,
					),
				],
			}
		}
	}

export default isZonedDateTime
