import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	speaker?: string // Character name
	mood?: "angry" | "sad" | "excited" | "whispered" | "shouted" | "sarcastic"
	tone?: "formal" | "informal" | "intimate" | "distant"
	itemProp?: string // schema.org/quotation
	cite?: string // Source work
	generateJsonLd?: boolean // Generate JSON-LD structured data
	children: string
}

export default function Dialogue({
	speaker,
	mood,
	tone,
	itemProp = "quotation",
	cite,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "Quotation",
			text: children,
			...(speaker
				? {
					spokenByCharacter: {
						"@type": "Person",
						name: speaker,
					},
				}
				: {}),
			...(cite
				? {
					isPartOf: {
						"@type": "CreativeWork",
						url: cite,
					},
				}
				: {}),
			additionalProperty: [
				...(mood
					? [{
						"@type": "PropertyValue",
						name: "mood",
						value: mood,
					}]
					: []),
				...(tone
					? [{
						"@type": "PropertyValue",
						name: "tone",
						value: tone,
					}]
					: []),
			],
		}
		: null

	return (
		<q
			class="dialogue"
			itemProp={itemProp}
			cite={cite}
			data-speaker={speaker}
			data-mood={mood}
			data-tone={tone}
			{...props}
		>
			{children}

			{/* Microdata */}
			{speaker && <meta itemProp="character" content={speaker} />}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</q>
	)
}
