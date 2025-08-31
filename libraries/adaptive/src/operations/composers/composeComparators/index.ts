import type {
	AdaptiveError,
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperationFunction,
} from "@adaptiveTypes/index.ts"

import { OPERAND_TYPES } from "@adaptiveSrc/constructors/constants/index.ts"
import Error from "@adaptiveSrc/constructors/Error/index.ts"
import getOperandKeys from "@adaptiveSrc/operations/helpers/getOperandKeys/index.ts"
import not from "@toolkit/simple/logic/not/index.ts"
import toCamel from "@toolkit/simple/string/toCase/toCamel/index.ts"

type ComparatorOperand = ComparatorConfig | LogicalConfig | Operand

const composeComparators = async (
	operation: ComparatorOperand | undefined,
): Promise<OperationFunction<unknown>> => {
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
		const value = (operation as unknown as Record<string, unknown>)[key]
		const resolvedValue = Array.isArray(value)
			? await Promise.all(
				(value as ComparatorOperand[]).map((op) => composeComparators(op)),
			)
			: await composeComparators(value as ComparatorOperand)
		return [key, resolvedValue]
	})

	const resolvedOperands = Object.fromEntries(
		await Promise.all(resolvedOperandPromises),
	)

	const hydratedOperation = { ...operation, ...resolvedOperands }

	try {
		// All comparators are organized by comparison type (alphabetical, numerical, etc.)
		if ((operation as unknown as { type?: string }).type === "comparator") {
			const { default: comparatorExecutor } = await import(
				`../../comparators/${
					(operation as unknown as { comparison: string }).comparison
				}/$${toCamel((operation as unknown as { tag: string }).tag)}/index.js`
			)
			return comparatorExecutor(hydratedOperation)
		}

		if (
			(operation as unknown as { type?: string }).type ===
				OPERAND_TYPES.injector
		) {
			const { default: injectorExecutor } = await import(
				`../../../injectors/${
					toCamel((operation as unknown as { tag: string }).tag)
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
	} catch (e: unknown) {
		return () =>
			Promise.resolve({
				left: [
					Error((operation as ComparatorConfig).tag || "Unknown")("Comparison")(
						`Comparison "${(operation as ComparatorConfig).tag}" with type "${
							(operation as ComparatorConfig).type
						}" could not be loaded. ${String(e)}`,
					) as AdaptiveError,
				],
			})
	}
}

export default composeComparators
