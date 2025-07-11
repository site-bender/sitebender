import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	alphabet?:
		| "latin"
		| "greek"
		| "cyrillic"
		| "arabic"
		| "hebrew"
		| "chinese"
		| "japanese"
		| "korean"
	case?: "upper" | "lower" | "mixed"
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function Letter({
	alphabet,
	case: letterCase,
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
				"@type": "DefinedTerm",
				name: "letter",
				additionalProperty: [
					...(alphabet
						? [{
							"@type": "PropertyValue",
							name: "alphabet",
							value: alphabet,
						}]
						: []),
					...(letterCase
						? [{
							"@type": "PropertyValue",
							name: "case",
							value: letterCase,
						}]
						: []),
				],
			},
		}
		: null

	return (
		<i
			class="letter"
			itemProp={itemProp}
			data-alphabet={alphabet}
			data-case={letterCase}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
