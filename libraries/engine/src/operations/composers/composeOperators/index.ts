import type {
	EngineError,
	Operand,
	OperationFunction,
} from "@sitebender/engine-types/index.ts"

import { OPERAND_TYPES } from "@sitebender/engine/constructors/constants/index.ts"
import Error from "@sitebender/engine/constructors/Error/index.ts"
import getOperandKeys from "@sitebender/engine/operations/helpers/getOperandKeys/index.ts"
import _not from "@sitebender/toolkit/simple/logic/not/index.ts"
import toCamel from "@sitebender/toolkit/simple/string/toCase/toCamel/index.ts"

// Type guard: does the candidate have a string tag?
const hasStringTag = (op: unknown): op is { tag: string } =>
	typeof (op as { tag?: unknown }).tag === "string"

const composeOperators = async (
	operation: Operand | undefined,
): Promise<OperationFunction> => {
	if (!operation || !hasStringTag(operation)) {
		return () =>
			Promise.resolve({
				left: [
					Error("Unknown")("Operation")(
						`Operation undefined or malformed: ${
							JSON.stringify(operation)
						}.`,
					) as EngineError,
				],
			})
	}

	const operandKeys = getOperandKeys(operation)

	const resolvedOperandPromises = operandKeys.map(async (key: string) => {
		const value = (operation as unknown as Record<string, unknown>)[key]
		const resolvedValue = Array.isArray(value)
			? await Promise.all(
				value.map((op: Operand) => composeOperators(op)),
			)
			: await composeOperators(value as Operand)
		return [key, resolvedValue]
	})

	const resolvedOperands = Object.fromEntries(
		await Promise.all(resolvedOperandPromises),
	)

	const hydratedOperation = { ...operation, ...resolvedOperands }

	try {
		if (operation.type === OPERAND_TYPES.operator) {
			const { default: operatorExecutor } = await import(
				`../../operators/${toCamel(operation.tag)}/index.js`
			)
			return operatorExecutor(hydratedOperation)
		}

		if (operation.type === OPERAND_TYPES.injector) {
			const { default: injectorExecutor } = await import(
				`../../../injectors/${toCamel(operation.tag)}/index.js`
			)
			return injectorExecutor(hydratedOperation)
		}

		// Exhaustive guard (should be unreachable)
		const unreachable: never = operation as never
		return () =>
			Promise.resolve({
				left: [
					Error(
						(unreachable as unknown as { tag?: string }).tag ||
							"Unknown",
					)(
						"Operation",
					)(
						`Unknown type: ${
							(unreachable as unknown as { type?: string }).type
						}`,
					) as EngineError,
				],
			})
	} catch (e: unknown) {
		return () =>
			Promise.resolve({
				left: [
					Error(operation.tag || "Unknown")("Operation")(
						`Operation "${operation.tag}" with type "${operation.type}" could not be loaded. ${
							String(e)
						}`,
					) as EngineError,
				],
			})
	}
}

export default composeOperators
