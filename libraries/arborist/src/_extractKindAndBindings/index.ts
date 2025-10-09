import type { ImportBinding } from "../types/index.ts"
import extractNamedBindings from "../_extractNamedBindings/index.ts"
import extractLocalName from "../_extractLocalName/index.ts"

//++ Extract import kind and bindings from specifiers
export default function extractKindAndBindings(
	specifiers: ReadonlyArray<unknown>,
) {
	return function extractWithTypeOnly(
		isTypeOnly: boolean,
	): Readonly<{
		kind: "default" | "named" | "namespace" | "type"
		imports: ReadonlyArray<ImportBinding>
	}> {
		// Side-effect import: import "./foo.ts"
		if (specifiers.length === 0) {
			return {
				kind: isTypeOnly ? "type" : "named",
				imports: [],
			}
		}

		// Check first specifier to determine kind
		const firstSpec = specifiers[0] as Record<string, unknown>
		const firstType = firstSpec.type as string

		// Type-only imports: import type { Foo } from "./foo.ts"
		if (isTypeOnly) {
			return {
				kind: "type",
				imports: extractNamedBindings(specifiers)(true),
			}
		}

		// Namespace import: import * as foo from "./foo.ts"
		if (
			firstType === "ImportStarAsSpecifier" ||
			firstType === "ImportNamespaceSpecifier"
		) {
			const local = extractLocalName(firstSpec)
			return {
				kind: "namespace",
				imports: [{
					imported: "*",
					local,
					isType: false,
				}],
			}
		}

		// Default import only: import foo from "./foo.ts"
		if (firstType === "ImportDefaultSpecifier" && specifiers.length === 1) {
			const local = extractLocalName(firstSpec)
			return {
				kind: "default",
				imports: [{
					imported: "default",
					local,
					isType: false,
				}],
			}
		}

		// Named imports (possibly with default): import foo, { bar } from "./foo.ts"
		return {
			kind: "named",
			imports: extractNamedBindings(specifiers)(false),
		}
	}
}
