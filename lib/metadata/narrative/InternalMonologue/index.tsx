import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	speaker?: string // Character thinking
	mood?: "questioning" | "reflective" | "anxious" | "confident" | "confused"
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function InternalMonologue({
	speaker,
	mood,
	itemProp,
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
			additionalProperty: [
				{
					"@type": "PropertyValue",
					name: "narrativeType",
					value: "internal monologue",
				},
				...(mood
					? [{
						"@type": "PropertyValue",
						name: "mood",
						value: mood,
					}]
					: []),
			],
		}
		: null

	return (
		<i
			class="internal-monologue"
			itemProp={itemProp}
			data-speaker={speaker}
			data-mood={mood}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
