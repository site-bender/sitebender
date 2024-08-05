import not from "../../../../src/utilities/not"
import Error from "../../../constructors/Error"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const proportionedRate = op => arg => {
	const table = composeOperators(op.table)(arg)
	const amount = composeOperators(op.amount)(arg)

	if (isLeft(table)) {
		table.left.push(amount)
		return table
	}

	if (isLeft(amount)) {
		return { left: [table, ...amount.left] }
	}

	try {
		const arr =
			typeof table.right === "string" ? JSON.parse(table.right) : table.right

		if (not(Array.isArray(arr))) {
			return {
				left: [
					table,
					amount,
					Error(op)("ProportionedRate")("Table is not an array."),
				],
			}
		}

		const [ratio] = arr.reduce(
			([out, remaining], [amount, rate]) => {
				const amt = Math.min(remaining, amount ?? Number.MAX_VALUE)

				return [out + rate * (amt < 0 ? 0 : amt), remaining - amount]
			},
			[0, amount.right],
		)

		return { right: ratio / amount.right }
	} catch (e) {
		return {
			left: [Error(op)("ProportionedRate")(`Failed to parse JSON table: ${e}`)],
		}
	}
}

export default proportionedRate
