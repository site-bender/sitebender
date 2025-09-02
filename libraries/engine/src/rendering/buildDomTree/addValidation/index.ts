import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	LogicalConfig,
	Operand,
	OperationFunction,
} from "../../../../types/index.ts"

import composeValidator from "../../../operations/composers/composeValidator/index.ts"

// Accept a plain HTMLElement and augment it internally; avoids strict call-site type mismatch
const addValidation = (elem: HTMLElement) => (validation: unknown) => {
	if (!validation) return

	// Store a callable that lazily awaits the composed validator on first call
	let validatorPromise: Promise<OperationFunction<unknown>> | undefined // Augment the element with a validate function at runtime
	;(elem as HTMLElement & {
		__sbValidate?: (
			arg: unknown,
			localValues?: unknown,
		) => Promise<Either<Array<EngineError>, boolean>>
	})
		.__sbValidate = async (arg: unknown, localValues?: unknown) => {
			if (!validatorPromise) {
				validatorPromise = composeValidator(
					validation as ComparatorConfig | LogicalConfig | Operand,
				)
			}
			const validator = await validatorPromise
			const result = await validator(
				arg,
				localValues as LocalValues | undefined,
			)
			// Normalize to boolean Right or propagate Left
			return ("right" in (result as unknown as Record<string, unknown>))
				? { right: Boolean((result as { right: unknown }).right) }
				: (result as Either<Array<EngineError>, boolean>)
		}
}

export default addValidation
