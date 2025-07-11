import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	directionType?:
		| "entrance"
		| "exit"
		| "action"
		| "setting"
		| "emotion"
		| "aside"
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function StageDirection({
	directionType = "action",
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
			genre: "stage direction",
			additionalProperty: {
				"@type": "PropertyValue",
				name: "directionType",
				value: directionType,
			},
		}
		: null

	return (
		<span
			class={`stage-direction direction-type-${directionType}`}
			itemProp={itemProp}
			data-direction-type={directionType}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</span>
	)
}
