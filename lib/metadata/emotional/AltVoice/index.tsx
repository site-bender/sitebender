import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	voiceType?: "sarcastic" | "emphatic" | "ironic" | "dramatic" | "understated"
	intensity?: "subtle" | "moderate" | "strong"
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function AltVoice({
	voiceType = "emphatic",
	intensity = "moderate",
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "TextDigitalDocument",
			"text": children,
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "voiceType",
					"value": voiceType,
				},
				{
					"@type": "PropertyValue",
					"name": "intensity",
					"value": intensity,
				},
			],
		}
		: null

	return (
		<i
			class={`alt-voice voice-type-${voiceType}`}
			itemProp={itemProp}
			data-voice-type={voiceType}
			data-intensity={intensity}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
