import type { Iri } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate checking if value is an Iri
//++ Does NOT validate - only checks for the brand
//++ Used internally for unwrapping and type narrowing
export default function _isIri(value: unknown): value is Iri {
	return typeof value === "string"
}
