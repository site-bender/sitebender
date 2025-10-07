import type { Iri } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Iri WITHOUT validation
//++ Use only when you are certain the value is valid
//++ For safe construction with validation, use iri() instead
export default function unsafeIri(value: string): Iri {
	return value as Iri
}
