import type {
	ComparatorConfig,
	Either,
	ArchitectError,
	LocalValues,
	OperationFunction,
} from "@sitebender/architect-types/index.ts"

import { isLeft } from "@sitebender/architect-types/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isDuration = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, boolean>> => {
	const operandFn = await composeComparators(
		(op as unknown as { operand: unknown }).operand as never,
	)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const s = String(operand.right)
		// ISO 8601 duration, e.g., P3Y6M4DT12H30M5S
		const ISO_DURATION =
			/^P(?=\d|T\d)(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+(?:\.\d+)?S)?)?$/
		return ISO_DURATION.test(s) ? { right: true } : {
			left: [
				Error(op.tag)("IsDuration")(
					`${JSON.stringify(operand.right)} is not a duration.`,
				),
			],
		}
	} catch (e) {
		return {
			left: [
				Error(op.tag)("IsDuration")(
					`${JSON.stringify(operand.right)} is not a duration: ${e}.`,
				),
			],
		}
	}
}

export default isDuration
