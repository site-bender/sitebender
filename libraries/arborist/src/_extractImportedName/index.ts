import extractLocalName from "../_extractLocalName/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

//++ Extract the imported name from a specifier
export default function extractImportedName(spec: Record<string, unknown>): string {
	// For named imports: import { foo } or import { foo as bar }
	// The "imported" field contains the original name from the module
	const imported = spec.imported as Record<string, unknown> | undefined

	if (imported) {
		const importedType = imported.type as string
		if (isEqual(importedType)("Identifier")) {
			return imported.value as string
		}
	}

	// Fallback: use local if imported is missing
	return extractLocalName(spec)
}
