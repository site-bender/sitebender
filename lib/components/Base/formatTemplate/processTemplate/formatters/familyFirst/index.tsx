import type Person from "../../../../../../types/Thing/Person/index.ts"

export default function familyFirst(value: unknown): string {
	if (value === "UNKNOWN") {
		return "UNKNOWN"
	}

	// Handle Person object
	if (typeof value === "object" && value !== null) {
		const person = value as Person

		if (person.familyName && person.givenName) {
			return `${person.familyName}, ${person.givenName}`
		}
		if (person.name) {
			return String(person.name)
		}
	}

	// Fallback to string representation
	return String(value)
}
