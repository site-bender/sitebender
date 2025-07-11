import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	termType?: "concept" | "technique" | "method" | "principle" | "theory"
	field?: string // Domain/discipline
	definition?: string // Brief definition
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function MentionedTerm({
	termType = "concept",
	field,
	definition,
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			name: children,
			...(definition ? { description: definition } : {}),
			...(field
				? {
					inDefinedTermSet: {
						"@type": "DefinedTermSet",
						name: `${field} terminology`,
						about: field,
					},
				}
				: {}),
			additionalProperty: {
				"@type": "PropertyValue",
				name: "termType",
				value: termType,
			},
		}
		: null

	return (
		<i
			class={`mentioned-term term-type-${termType}`}
			title={definition}
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
