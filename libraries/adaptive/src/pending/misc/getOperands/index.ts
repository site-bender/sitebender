import type { Operand } from "../../types/index.ts"

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
export default function getOperands(operation: Operand): Array<Operand> {
	return operation.operands || []
}
