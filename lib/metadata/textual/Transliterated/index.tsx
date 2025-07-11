import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	originalLang: string // Original script language
	originalScript?: string // Original text in native script
	transliterationSystem?: "iso" | "ala-lc" | "pinyin" | "romaji" | "bgn-pcgn" // Transliteration systems
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean // Flag to generate JSON-LD data
	children: string
}

export default function Transliterated({
	originalLang,
	originalScript,
	transliterationSystem,
	itemProp,
	generateJsonLd = false, // Default value for generateJsonLd
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "TextDigitalDocument",
			text: children,
			inLanguage: "en", // Transliterated text is typically in target language
			...(originalScript
				? {
					translationOfWork: {
						"@type": "TextDigitalDocument",
						text: originalScript,
						inLanguage: originalLang,
					},
				}
				: {}),
			...(transliterationSystem
				? {
					additionalProperty: {
						"@type": "PropertyValue",
						name: "transliterationSystem",
						value: transliterationSystem,
					},
				}
				: {}),
		}
		: null

	return (
		<i
			class="transliterated"
			itemProp={itemProp}
			data-original-lang={originalLang}
			data-original-script={originalScript}
			data-transliteration-system={transliterationSystem}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
