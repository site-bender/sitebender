import type { HydratedProportionedRate } from "../../../../types/hydrated/index.ts"
import type {
	ArchitectError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import _Error from "../../../constructors/Error/index.ts"
import not from "../not/index.ts"

const proportionedRate = (
	{ table, amount, ..._op }: HydratedProportionedRate,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, number>> => {
	const resolvedTable = await table(arg, localValues)
	if (isLeft(resolvedTable)) {
		return resolvedTable as Either<ArchitectError[], number>
	}

	const resolvedAmount = await amount(arg, localValues)
	if (isLeft(resolvedAmount)) {
		return resolvedAmount as Either<ArchitectError[], number>
	}

	try {
		const arr = typeof resolvedTable.right === "string"
			? JSON.parse(resolvedTable.right)
			: resolvedTable.right

		if (not(Array.isArray(arr))) {
			return {
				left: [{
					tag: "Error",
					operation: "ProportionedRate",
					message: "Table is not an array.",
				}],
			}
		}

		const [ratio] = (arr as Array<[number, number]>).reduce(
			(
				[out, remaining]: [number, number],
				[amount, rate]: [number, number],
			) => {
				const amt = Math.min(remaining, amount ?? Number.MAX_VALUE)

				return [out + rate * (amt < 0 ? 0 : amt), remaining - amount]
			},
			[0, resolvedAmount.right as number],
		)

		return { right: ratio / resolvedAmount.right }
	} catch (e) {
		return {
			left: [{
				tag: "Error",
				operation: "ProportionedRate",
				message: `Failed to parse JSON table: ${e}`,
			}],
		}
	}
}

export default proportionedRate
