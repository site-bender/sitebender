import type { Iri } from "@sitebender/toolsmith/types/branded/index.ts"
import _isIri from "@sitebender/toolsmith/newtypes/webTypes/iri/_isIri/index.ts"

//++ Extracts the raw string value from an Iri branded type
//++ Performs runtime check to ensure value is actually an Iri
//++ Throws if value is not an Iri (should never happen with correct typing)
export default function unwrapIri(value: Iri): string {
	if (!_isIri(value)) {
		throw new TypeError("Expected Iri but received non-string value")
	}
	return value
}
