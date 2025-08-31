import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "@adaptiveTypes/index.ts"

import { isLeft } from "@adaptiveTypes/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isInstant = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operandFn = await composeComparators(
		(op as unknown as { operand: unknown }).operand as never,
	)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		// RFC 3339 basic shape guard for instants
		const s = String(operand.right)
		const RFC3339 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/
		return RFC3339.test(s) ? { right: true } : {
			left: [
				Error(op.tag)("IsInstant")(
					`${JSON.stringify(operand.right)} is not an instant.`,
				),
			],
		}
	} catch (e) {
		return {
			left: [
				Error(op.tag)("IsInstant")(
					`${JSON.stringify(operand.right)} is not an instant: ${e}.`,
				),
			],
		}
	}
}

export default isInstant
