import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	title?: string // Definition/explanation
	itemProp?: string // Microdata (schema.org)
	termType?: "scientific" | "programming" | "medical" | "legal" | "mathematical"
	field?: string // Domain/field of study
	generateJsonLd?: boolean // Generate JSON-LD structured data
	children: string
}

export default function TechnicalTerm({
	title,
	itemProp,
	termType = "scientific",
	field,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			name: children,
			...(title ? { description: title } : {}),
			inDefinedTermSet: {
				"@type": "DefinedTermSet",
				name: `${termType} terminology`,
				...(field ? { about: field } : {}),
			},
			...(termType === "medical"
				? { additionalType: "https://schema.org/MedicalEntity" }
				: {}),
		}
		: null

	return (
		<i
			class={`technical-term term-type-${termType}`}
			title={title}
			itemProp={itemProp}
			data-term-type={termType}
			data-field={field}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
