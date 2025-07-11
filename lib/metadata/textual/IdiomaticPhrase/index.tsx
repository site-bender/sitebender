import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	lang?: string
	title?: string // Meaning/explanation
	origin?: string // Cultural/linguistic origin
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function IdiomaticPhrase({
	lang,
	title,
	origin,
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
			...(title ? { description: title } : {}),
			...(lang ? { inLanguage: lang } : {}),
			inDefinedTermSet: {
				"@type": "DefinedTermSet",
				name: "idiomatic expressions",
				...(lang ? { inLanguage: lang } : {}),
			},
			...(origin
				? {
					additionalProperty: {
						"@type": "PropertyValue",
						name: "culturalOrigin",
						value: origin,
					},
				}
				: {}),
		}
		: null

	return (
		<i
			class="idiomatic-phrase"
			lang={lang}
			title={title}
			itemProp={itemProp}
			data-origin={origin}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
