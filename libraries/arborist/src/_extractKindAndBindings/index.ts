import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ImportBinding } from "../types/index.ts"
import type { ImportExtractionError } from "../types/errors/index.ts"

import extractNamedBindings from "../_extractNamedBindings/index.ts"
import extractLocalName from "../_extractLocalName/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"

//++ Extract import kind and bindings from specifiers with validation
//++ Returns curried function: specifiers → isTypeOnly → Result
export default function extractKindAndBindings(
	specifiers: ReadonlyArray<unknown>,
) {
	return function extractWithTypeOnly(
		isTypeOnly: boolean,
	): Result<
		ImportExtractionError,
		Readonly<{
			kind: "default" | "named" | "namespace" | "type"
			imports: ReadonlyArray<ImportBinding>
		}>
	> {
		// Side-effect import: import "./foo.ts"
		if (isEqual(length(specifiers))(0)) {
			return ok({
				kind: isTypeOnly ? "type" : "named",
				imports: [],
			})
		}

		// Check first specifier to determine kind
		const firstSpec = specifiers[0] as Record<string, unknown> | undefined

		if (firstSpec === undefined) {
			const baseError = createError("_extractKindAndBindings")([])(
				"Specifiers array is not empty but first element is undefined",
			)("INVALID_ARGUMENT")

			return error({
				...baseError,
				kind: "InvalidSpecifier",
			} as ImportExtractionError)
		}

		const firstType = firstSpec.type as string

		// Type-only imports: import type { Foo } from "./foo.ts"
		if (isTypeOnly) {
			const bindingsResult = extractNamedBindings(specifiers)(true)

			if (bindingsResult._tag === "error") {
				return bindingsResult
			}

			return ok({
				kind: "type",
				imports: bindingsResult.value,
			})
		}

		// Namespace import: import * as foo from "./foo.ts"
		if (
			isEqual(firstType)("ImportStarAsSpecifier") ||
			isEqual(firstType)("ImportNamespaceSpecifier")
		) {
			const localResult = extractLocalName(firstSpec)

			if (localResult._tag === "error") {
				const baseError = createError("_extractKindAndBindings")([])(
					`Failed to extract local name for namespace import: ${localResult.error.message}`,
				)("INVALID_ARGUMENT")

				return error({
					...baseError,
					kind: "InvalidSpecifier",
				} as ImportExtractionError)
			}

			return ok({
				kind: "namespace",
				imports: [{
					imported: "*",
					local: localResult.value,
					isType: false,
				}],
			})
		}

		// Default import only: import foo from "./foo.ts"
		if (
			and(isEqual(firstType)("ImportDefaultSpecifier"))(
				isEqual(length(specifiers))(1),
			)
		) {
			const localResult = extractLocalName(firstSpec)

			if (localResult._tag === "error") {
				const baseError = createError("_extractKindAndBindings")([])(
					`Failed to extract local name for default import: ${localResult.error.message}`,
				)("INVALID_ARGUMENT")

				return error({
					...baseError,
					kind: "InvalidSpecifier",
				} as ImportExtractionError)
			}

			return ok({
				kind: "default",
				imports: [{
					imported: "default",
					local: localResult.value,
					isType: false,
				}],
			})
		}

		// Named imports (possibly with default): import foo, { bar } from "./foo.ts"
		const bindingsResult = extractNamedBindings(specifiers)(false)

		if (bindingsResult._tag === "error") {
			return bindingsResult
		}

		return ok({
			kind: "named",
			imports: bindingsResult.value,
		})
	}
}
