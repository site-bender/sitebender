//++ Formats a type definition from the contract into markdown

import type { Section } from "../section/index.ts"
import type { TypeDefinition } from "./types/index.ts"

export default function formatType(type: TypeDefinition): Section {
	const base = [
		`#### \`${type.name}\``,
		"",
		type.description,
		"",
	]

	const fields = type.fields && type.fields.length > 0
		? ["**Fields:**", "", ...type.fields.map((f) => `- \`${f}\``), ""]
		: []

	const note = type.note ? [`> **Note:** ${type.note}`, ""] : []

	return [...base, ...fields, ...note]
}
