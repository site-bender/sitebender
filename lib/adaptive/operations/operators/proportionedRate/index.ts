import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"
import not from "../../not/index.js"

const proportionedRate =
	({ table, amount, ...op }) => async (arg, localValues) => {
		const resolvedTable = await table(arg, localValues)
		if (isLeft(resolvedTable)) return resolvedTable

		const resolvedAmount = await amount(arg, localValues)
		if (isLeft(resolvedAmount)) return resolvedAmount

		try {
			const arr = typeof resolvedTable.right === "string"
				? JSON.parse(resolvedTable.right)
				: resolvedTable.right

			if (not(Array.isArray(arr))) {
				return {
					left: [Error(op)("ProportionedRate")("Table is not an array.")],
				}
			}

			const [ratio] = arr.reduce(
				([out, remaining], [amount, rate]) => {
					const amt = Math.min(remaining, amount ?? Number.MAX_VALUE)

					return [out + rate * (amt < 0 ? 0 : amt), remaining - amount]
				},
				[0, resolvedAmount.right],
			)

			return { right: ratio / resolvedAmount.right }
		} catch (e) {
			return {
				left: [
					Error(op)("ProportionedRate")(`Failed to parse JSON table: ${e}`),
				],
			}
		}
	}

export default proportionedRate
