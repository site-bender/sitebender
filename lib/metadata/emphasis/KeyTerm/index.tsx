import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	definition?: string // schema.org/definition
	field?: string // Domain of study
	importance?: "primary" | "secondary" | "tertiary"
	firstMention?: boolean // Is this the first time this term appears?
	itemProp?: string // schema.org/keywords
	generateJsonLd?: boolean // Generate JSON-LD structured data
	children: string
}

export default function KeyTerm({
	definition,
	field,
	importance = "primary",
	firstMention = false,
	itemProp = "keywords",
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
			additionalProperty: [
				{
					"@type": "PropertyValue",
					name: "importance",
					value: importance,
				},
				{
					"@type": "PropertyValue",
					name: "firstMention",
					value: String(firstMention),
				},
			],
		}
		: null

	return (
		<b
			class={`key-term importance-${importance}`}
			title={definition}
			itemProp={itemProp}
			data-field={field}
			data-importance={importance}
			data-first-mention={firstMention}
			{...props}
		>
			{children}

			{/* Microdata */}
			{definition && <meta itemProp="definition" content={definition} />}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</b>
	)
}
