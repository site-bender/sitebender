import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "@engineTypes/index.ts"

import { isLeft } from "@engineTypes/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isCalendar = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, boolean>> => {
	const operandFn = await composeComparators(
		(op as unknown as { operand: unknown }).operand as never,
	)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) return operand

	// Minimal guard: accept non-empty string identifiers as calendar IDs for now
	const id = String(operand.right)
	if (id && id.trim().length > 0) return { right: true }

	return {
		left: [
			Error(op.tag)("IsCalendar")(
				`${JSON.stringify(operand.right)} is not a valid calendar id.`,
			),
		],
	}
}

export default isCalendar
