//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import type { BCP47LanguageTag } from "../../../../types/bcp47/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Whether it's become a common word (like radar, laser)
	commonWord?: boolean
	// Description for accessibility
	description?: string
	// Full expansion
	expansion: string
	// Field or domain
	field?: string
	// Link to definition
	href?: string
	// IPA pronunciation
	ipa?: string
	// Language
	lang?: BCP47LanguageTag
	// Phonetic pronunciation
	pronunciation?: string
	// Style preference
	style?: "uppercase" | "lowercase" | "mixed"
}

export default function Acronym({
	children,
	commonWord = false,
	description: _description,
	expansion,
	field,
	href,
	ipa,
	lang,
	pronunciation,
	style = "uppercase",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		commonWord ? "acronym now common word" : "acronym",
		expansion,
		pronunciation && `pronounced ${pronunciation}`,
	].filter(Boolean).join(", ")

	const content = (
		<abbr
			aria-label={ariaLabel}
			class={`acronym acronym-${style}${
				commonWord ? " acronym-common-word" : ""
			}`}
			data-common-word={commonWord}
			data-expansion={expansion}
			data-field={field}
			data-ipa={ipa}
			data-pronunciation={pronunciation}
			data-style={style}
			lang={lang}
			title={expansion}
			{...props}
		>
			{children}
		</abbr>
	)

	if (href) {
		return (
			<a href={href} class="acronym-link">
				{content}
			</a>
		)
	}

	return content
}
