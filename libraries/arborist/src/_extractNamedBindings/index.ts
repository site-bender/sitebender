import type { ImportBinding } from "../types/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import extractImportedName from "../_extractImportedName/index.ts"
import extractLocalName from "../_extractLocalName/index.ts"

//++ Extract bindings from named import specifiers
export default function extractNamedBindings(
	specifiers: ReadonlyArray<unknown>,
) {
	return function extractWithTypeFlag(
		isTypeOnly: boolean,
	): ReadonlyArray<ImportBinding> {
		const bindingsResult = map(function extractBinding(
			spec: unknown,
		): ImportBinding {
			const specObj = spec as Record<string, unknown>
			const specType = specObj.type as string

			// Default specifier in mixed import: import foo, { bar } from "./baz.ts"
			if (specType === "ImportDefaultSpecifier") {
				const local = extractLocalName(specObj)
				return {
					imported: "default",
					local,
					isType: isTypeOnly,
				}
			}

			// Named specifier: import { foo } from "./bar.ts"
			// Named specifier with alias: import { foo as bar } from "./baz.ts"
			if (specType === "ImportSpecifier") {
				const imported = extractImportedName(specObj)
				const local = extractLocalName(specObj)
				const isSpecTypeOnly = (specObj.isTypeOnly as boolean) || isTypeOnly

				return {
					imported,
					local,
					isType: isSpecTypeOnly,
				}
			}

			// Fallback for unknown specifier types
			return {
				imported: "unknown",
				local: "unknown",
				isType: isTypeOnly,
			}
		})(specifiers)
		return getOrElse([] as ReadonlyArray<ImportBinding>)(bindingsResult)
	}
}
