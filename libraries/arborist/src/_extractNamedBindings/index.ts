import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ImportBinding } from "../types/index.ts"
import type { ImportExtractionError } from "../types/errors/index.ts"

import extractImportedName from "../_extractImportedName/index.ts"
import extractLocalName from "../_extractLocalName/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

//++ Extract bindings from named import specifiers with validation
//++ Returns curried function: specifiers → isTypeOnly → Result<Error, Bindings>
//++ Processes array of specifiers and extracts import bindings
//++
//++ @param specifiers - Array of import specifier nodes
//++ @returns Curried function that takes isTypeOnly flag
//++
//++ Error kinds:
//++ - InvalidSpecifier: specifier has invalid structure
//++ - UnknownImportKind: specifier type is not recognized
export default function extractNamedBindings(
	specifiers: ReadonlyArray<unknown>,
) {
	return function extractWithTypeFlag(
		isTypeOnly: boolean,
	): Result<ImportExtractionError, ReadonlyArray<ImportBinding>> {
		// Helper function to process a single specifier
		function processSpecifier(
			spec: unknown,
		): Result<ImportExtractionError, ImportBinding> {
			const specObj = spec as Record<string, unknown>
			const specType = specObj.type as string | undefined

			if (specType === undefined) {
				const baseError = createError("_extractNamedBindings")([])(
					"Import specifier has no 'type' property",
				)("INVALID_ARGUMENT")

				return error({
					...baseError,
					kind: "UnknownImportKind",
				} as ImportExtractionError)
			}

			// Default specifier in mixed import: import foo, { bar } from "./baz.ts"
			if (isEqual(specType)("ImportDefaultSpecifier")) {
				const localResult = extractLocalName(specObj)

				if (localResult._tag === "error") {
					const baseError = createError("_extractNamedBindings")([])(
						`Failed to extract local name from default specifier: ${localResult.error.message}`,
					)("INVALID_ARGUMENT")

					return error({
						...baseError,
						kind: "InvalidSpecifier",
					} as ImportExtractionError)
				}

				return ok({
					imported: "default",
					local: localResult.value,
					isType: isTypeOnly,
				})
			}

			// Named specifier: import { foo } from "./bar.ts"
			// Named specifier with alias: import { foo as bar } from "./baz.ts"
			if (isEqual(specType)("ImportSpecifier")) {
				const importedResult = extractImportedName(specObj)

				if (importedResult._tag === "error") {
					const baseError = createError("_extractNamedBindings")([])(
						`Failed to extract imported name: ${importedResult.error.message}`,
					)("INVALID_ARGUMENT")

					return error({
						...baseError,
						kind: "InvalidSpecifier",
					} as ImportExtractionError)
				}

				const localResult = extractLocalName(specObj)

				if (localResult._tag === "error") {
					const baseError = createError("_extractNamedBindings")([])(
						`Failed to extract local name: ${localResult.error.message}`,
					)("INVALID_ARGUMENT")

					return error({
						...baseError,
						kind: "InvalidSpecifier",
					} as ImportExtractionError)
				}

				const isSpecTypeOnly = or(specObj.isTypeOnly as boolean)(
					isTypeOnly,
				) as boolean

				return ok({
					imported: importedResult.value,
					local: localResult.value,
					isType: isSpecTypeOnly,
				})
			}

			// Unknown specifier type
			const baseError = createError("_extractNamedBindings")([])(
				`Unknown import specifier type: ${specType}`,
			)("INVALID_ARGUMENT")

			return error({
				...baseError,
				kind: "UnknownImportKind",
			} as ImportExtractionError)
		}

		// Use reduce to accumulate bindings, failing fast on first error
		const initialResult: Result<
			ImportExtractionError,
			ReadonlyArray<ImportBinding>
		> = ok([])

		const finalResult = reduce(
			function accumulateBinding(
				accResult: Result<ImportExtractionError, ReadonlyArray<ImportBinding>>,
			) {
				return function processNext(
					spec: unknown,
				): Result<ImportExtractionError, ReadonlyArray<ImportBinding>> {
					// If already failed, propagate error
					if (accResult._tag === "error") {
						return accResult
					}

					// Process current specifier
					const bindingResult = processSpecifier(spec)

					if (bindingResult._tag === "error") {
						return bindingResult
					}

					// Append binding to accumulated array
					const newBindings = [...accResult.value, bindingResult.value]
					return ok(newBindings as ReadonlyArray<ImportBinding>)
				}
			},
		)(specifiers)(initialResult)

		return finalResult
	}
}
