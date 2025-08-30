import type { LocalValues, OperationFunction, Either, AdaptiveError } from "../../../types/index.ts"
import { isLeft } from "../../../types/index.ts"
import composeOperators from "../../operations/composers/composeOperators/index.ts"

type MonetaryOp = { locales?: string | string[]; operand: unknown; options?: Intl.NumberFormatOptions }

const asMonetaryAmount = (op: MonetaryOp): OperationFunction<string> =>
async (arg: unknown, localValues?: LocalValues): Promise<Either<Array<AdaptiveError>, string>> => {
	const { locales, operand, options } = op

	const operandFn = await composeOperators(operand as never)
	const value = await operandFn(arg, localValues)

	if (isLeft(value)) return value

	return {
		right: new Intl.NumberFormat(locales, {
			...options,
			style: "currency",
		}).format(value.right as number),
	}
}

export default asMonetaryAmount
