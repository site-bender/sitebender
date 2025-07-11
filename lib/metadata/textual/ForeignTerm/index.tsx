import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	lang: string
	title: string // Translation/explanation
	ruby?: string // Pronunciation/transliteration
	itemProp?: string // Microdata (schema.org)
	termType?: "loanword" | "technical" | "properNoun" | "phrase"
	generateJsonLd?: boolean // Generate JSON-LD structured data
	children: string
}

export default function ForeignTerm({
	lang,
	title,
	ruby,
	itemProp,
	termType = "loanword",
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			name: children,
			description: title,
			inLanguage: lang,
			...(ruby ? { termCode: ruby } : {}),
			inDefinedTermSet: {
				"@type": "DefinedTermSet",
				name: `${termType} terms`,
				inLanguage: lang,
			},
		}
		: null

	return (
		<i
			class={`foreign-term term-type-${termType}`}
			lang={lang}
			title={title}
			itemProp={itemProp}
			data-term-type={termType}
			data-original-script={!ruby ? undefined : children}
			data-transliteration={ruby}
			{...props}
		>
			{ruby
				? (
					<ruby>
						{children} <rt>{ruby}</rt>
					</ruby>
				)
				: children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
