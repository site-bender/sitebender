//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import type { BCP47LanguageTag } from "../../../../types/bcp47/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	// Text direction for RTL languages
	dir?: "ltr" | "rtl" | "auto"
	element?: "i" | "span" | "em" | "dfn" | "cite"
	// Link to definition or glossary
	href?: string
	// Language of the foreign term
	lang: BCP47LanguageTag
	// Romanized version for non-Latin scripts
	romanized?: string
	// Translation into the document's language
	translation?: string
}

export default function ForeignTerm({
	children,
	description: _description,
	dir,
	element: Element = "i",
	href,
	lang,
	romanized,
	translation,
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		translation,
		romanized && `romanized as ${romanized}`,
		`in ${lang}`,
	].filter(Boolean).join(", ")

	const content = (
		<Element
			aria-label={ariaLabel}
			class="foreign-term"
			data-romanized={romanized}
			data-translation={translation}
			dir={dir}
			lang={lang}
			title={translation}
			{...props}
		>
			{children}
		</Element>
	)

	if (href) {
		return (
			<a href={href} class="foreign-term-link">
				{content}
			</a>
		)
	}

	return content
}
