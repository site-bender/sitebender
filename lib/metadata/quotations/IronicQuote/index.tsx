import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	ironyType?:
		| "sarcasm"
		| "understatement"
		| "skepticism"
		| "mockery"
		| "emphasis"
	intensity?: "subtle" | "obvious" | "heavy"
	itemProp?: string
	generateJsonLd?: boolean
	children: string
}

export default function IronicQuote({
	ironyType = "sarcasm",
	intensity = "obvious",
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
			additionalProperty: [
				{
					"@type": "PropertyValue",
					name: "ironyType",
					value: ironyType,
				},
				{
					"@type": "PropertyValue",
					name: "intensity",
					value: intensity,
				},
			],
		}
		: null

	return (
		<q
			class={`ironic-quote irony-type-${ironyType}`}
			itemProp={itemProp}
			data-irony-type={ironyType}
			data-intensity={intensity}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</q>
	)
}
