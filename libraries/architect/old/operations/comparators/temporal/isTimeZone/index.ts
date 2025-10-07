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

const isTimeZone = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, boolean>> => {
	const operandFn = await composeComparators(
		(op as unknown as { operand: unknown }).operand as never,
	)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) return operand

	// Conservative IANA tz id shape check: Region/City with letters, dashes or underscores
	const tz = String(operand.right)
	const IANA = /^[A-Za-z]+(?:[\-_][A-Za-z]+)*\/[A-Za-z]+(?:[\-_][A-Za-z]+)*$/
	return IANA.test(tz) ? { right: true } : {
		left: [
			Error(op.tag)("IsTimeZone")(
				`${JSON.stringify(operand.right)} is not an IANA time zone id.`,
			),
		],
	}
}

export default isTimeZone
