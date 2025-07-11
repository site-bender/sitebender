import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	thoughtType?: "internal" | "reflection" | "memory" | "imagination"
	speaker?: string // Character having the thought
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function ThoughtText({
	thoughtType = "internal",
	speaker,
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
			additionalProperty: {
				"@type": "PropertyValue",
				name: "thoughtType",
				value: thoughtType,
			},
		}
		: null

	return (
		<i
			class={`thought-text thought-type-${thoughtType}`}
			itemProp={itemProp}
			data-thought-type={thoughtType}
			data-speaker={speaker}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
