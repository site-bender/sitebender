import type { Operand } from "@sitebender/architect-types/index.ts"

/**
 * Extracts the operands array from an operation
 *
 * @param operation - The operation to extract operands from
 * @returns Array of operands or empty array if none exist
 * @example
 * ```typescript
 * const operands = getOperands(addOperation)
 * ```
 */
export default function getOperands(
	operation: Partial<{ operands: Array<Operand> }>,
): Array<Operand> {
	return Array.isArray((operation as { operands?: unknown }).operands)
		? ((operation as { operands: Array<Operand> }).operands)
		: []
}
