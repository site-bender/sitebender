import type {
	ArchitectError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "@sitebender/architect-types/index.ts"

import { isLeft } from "@sitebender/architect-types/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isCalendar = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, boolean>> => {
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
