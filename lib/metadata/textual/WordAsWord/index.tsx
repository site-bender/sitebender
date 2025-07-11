import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	lang?: string
	partOfSpeech?:
		| "noun"
		| "verb"
		| "adjective"
		| "adverb"
		| "preposition"
		| "conjunction"
		| "interjection"
	etymology?: string // Origin/etymology
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function WordAsWord({
	lang,
	partOfSpeech,
	etymology,
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			name: children,
			...(lang ? { inLanguage: lang } : {}),
			additionalProperty: [
				...(partOfSpeech
					? [{
						"@type": "PropertyValue",
						name: "partOfSpeech",
						value: partOfSpeech,
					}]
					: []),
				...(etymology
					? [{
						"@type": "PropertyValue",
						name: "etymology",
						value: etymology,
					}]
					: []),
			],
		}
		: null

	return (
		<i
			class="word-as-word"
			lang={lang}
			itemProp={itemProp}
			data-part-of-speech={partOfSpeech}
			data-etymology={etymology}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
