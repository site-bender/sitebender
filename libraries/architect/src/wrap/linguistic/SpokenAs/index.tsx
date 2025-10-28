//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import type { BCP47LanguageTag } from "../../../../types/bcp47/index.ts"

export type Props = {
	// Audio file URL for pronunciation reference
	// Can be relative or absolute URL
	// Will be added as data-audio attribute for JS/CSS hooks
	audio?: string
	children?: JSX.Element | Array<JSX.Element> | string
	description?: string
	element?: "div" | "span" | "i" | "b" | "strong" | "em" | "li" | "mark" | "p"
	// IPA (International Phonetic Alphabet) notation
	ipa?: string
	// Language code with full BCP-47 support
	// Provides IDE autocomplete for valid language tags
	lang?: BCP47LanguageTag
	// Phonetic spelling in plain text
	phonetic?: string
}

export default function SpokenAs({
	audio,
	children,
	description: _description,
	element: Element = "span",
	ipa,
	lang,
	phonetic,
	...props
}: Props): JSX.Element {
	return (
		<Element
			class="spoken-as"
			data-audio={audio}
			data-ipa={ipa}
			data-phonetic={phonetic}
			lang={lang}
			{...props}
		>
			{children}
		</Element>
	)
}
