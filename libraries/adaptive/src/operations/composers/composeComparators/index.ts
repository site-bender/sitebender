import type {
	AdaptiveError,
	ComparatorConfig,
	GlobalAttributes,
	LogicalConfig,
	Operand,
	OperationFunction,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"
import Error from "../../../constructors/Error/index.ts"
import getOperandKeys from "../../../operations/helpers/getOperandKeys/index.ts"
import not from "../../../utilities/predicates/not/index.ts"
import toCamel from "../../../utilities/string/toCamel/index.ts"

type ComparatorOperand = ComparatorConfig | LogicalConfig | Operand

const composeComparators = async (
	operation: ComparatorOperand | undefined,
): Promise<OperationFunction<boolean>> => {
	if (not(operation) || not((operation as ComparatorConfig).tag)) {
		return () =>
			Promise.resolve({
				left: [
					Error((operation as ComparatorConfig).tag || "Unknown")("Comparison")(
						`Comparison undefined or malformed: ${JSON.stringify(operation)}.`,
					) as AdaptiveError,
				],
			})
	}

	const operandKeys = getOperandKeys(operation as Operand)

	const resolvedOperandPromises = operandKeys.map(async (key: string) => {
		const value = (operation as Record<string, unknown>)[key]
		const resolvedValue = Array.isArray(value)
			? await Promise.all(
				value.map((op: ComparatorOperand) => composeComparators(op)),
			)
			: await composeComparators(value)
		return [key, resolvedValue]
	})

	const resolvedOperands = Object.fromEntries(
		await Promise.all(resolvedOperandPromises),
	)

	const hydratedOperation = { ...operation, ...resolvedOperands }

	try {
		// All comparators are organized by comparison type (alphabetical, numerical, etc.)
		if ((operation as ComparatorConfig).type === "comparator") {
			const { default: comparatorExecutor } = await import(
				`../../comparators/${((operation as
					| ComparatorConfig
					| LogicalConfig
					| Operand).comparison)}/${
					toCamel((operation as ComparatorConfig).tag)
				}/index.js`
			)
			return comparatorExecutor(hydratedOperation)
		}

		if ((operation as ComparatorConfig).type === OPERAND_TYPES.injector) {
			const { default: injectorExecutor } = await import(
				`../../../injectors/${
					toCamel((operation as ComparatorConfig).tag)
				}/index.js`
			)
			return injectorExecutor(hydratedOperation)
		}

		return () =>
			Promise.resolve({
				left: [
					Error((operation as ComparatorConfig).tag || "Unknown")("Comparison")(
						`Unknown type: ${(operation as ComparatorConfig).type}`,
					) as AdaptiveError,
				],
			})
	} catch (e: Error) {
		return () =>
			Promise.resolve({
				left: [
					Error((operation as ComparatorConfig).tag || "Unknown")("Comparison")(
						`Comparison "${(operation as ComparatorConfig).tag}" with type "${
							(operation as ComparatorConfig).type
						}" could not be loaded. ${e.message}`,
					) as AdaptiveError,
				],
			})
	}
}

export default composeComparators
