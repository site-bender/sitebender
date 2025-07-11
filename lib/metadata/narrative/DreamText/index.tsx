import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	dreamType?: "sequence" | "flashback" | "vision" | "nightmare"
	dreamer?: string // Character dreaming
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function DreamText({
	dreamType = "sequence",
	dreamer,
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			text: children,
			genre: "dream narrative",
			...(dreamer
				? {
					character: {
						"@type": "Person",
						name: dreamer,
					},
				}
				: {}),
			additionalProperty: {
				"@type": "PropertyValue",
				name: "dreamType",
				value: dreamType,
			},
		}
		: null

	return (
		<i
			class={`dream-text dream-type-${dreamType}`}
			itemProp={itemProp}
			data-dream-type={dreamType}
			data-dreamer={dreamer}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
