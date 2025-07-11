import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	emotion:
		| "joy"
		| "sadness"
		| "anger"
		| "fear"
		| "surprise"
		| "disgust"
		| "love"
		| "hope"
		| "despair"
		| "anxiety"
		| "excitement"
	intensity?: "subtle" | "moderate" | "strong" | "overwhelming"
	source?: string // What's causing the emotion
	target?: string // Who's experiencing it
	itemProp?: string // schema.org custom property
	generateJsonLd?: boolean // Generate JSON-LD structured data
	children: string
}

export default function Emotion({
	emotion,
	intensity = "moderate",
	source,
	target,
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "TextDigitalDocument",
			text: children,
			about: {
				"@type": "EmotionalState",
				name: emotion,
				additionalProperty: [
					{
						"@type": "PropertyValue",
						name: "intensity",
						value: intensity,
					},
					...(source
						? [{
							"@type": "PropertyValue",
							name: "source",
							value: source,
						}]
						: []),
					...(target
						? [{
							"@type": "PropertyValue",
							name: "experiencer",
							value: target,
						}]
						: []),
				],
			},
		}
		: null

	return (
		<span
			class={`emotion emotion-${emotion}`}
			itemProp={itemProp}
			data-emotion={emotion}
			data-intensity={intensity}
			data-source={source}
			data-target={target}
			{...props}
		>
			{children}

			{/* Microdata */}
			<meta itemProp="emotionalState" content={emotion} />

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</span>
	)
}
