/**
 * Abbreviation component
 *
 * Marks up general abbreviations (not acronyms or initialisms).
 * Provides expansion, language context, and pronunciation guidance
 * for accessibility and proper rendering.
 *
 * Example usage:
 *
 * <Abbreviation expansion="Doctor">Dr.</Abbreviation> Smith
 *
 * <Abbreviation
 *   expansion="et cetera"
 *   lang="la"
 *   ipa="/ɛt ˈsɛtərə/"
 * >
 *   etc.
 * </Abbreviation>
 *
 * <Abbreviation
 *   expansion="versus"
 *   context="legal"
 *   period={false}
 * >
 *   vs
 * </Abbreviation>
 */
import type { BCP47LanguageTag } from "../../../../types/bcp47/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Context or field where used
	context?: string
	// Description for accessibility
	description?: string
	// Full expansion of the abbreviation
	expansion: string
	// Link to glossary or definition
	href?: string
	// IPA pronunciation
	ipa?: string
	// Language of the abbreviation
	lang?: BCP47LanguageTag
	// Whether period is included (affects spacing)
	period?: boolean
	// Type of abbreviation
	type?: "title" | "unit" | "latin" | "general"
}

export default function Abbreviation({
	children,
	context,
	description: _description,
	expansion,
	href,
	ipa,
	lang,
	period = true,
	type = "general",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"abbreviation for",
		expansion,
		context && `in ${context} context`,
	].filter(Boolean).join(" ")

	const content = (
		<abbr
			aria-label={ariaLabel}
			class={`abbreviation abbreviation-${type}`}
			data-context={context}
			data-expansion={expansion}
			data-ipa={ipa}
			data-period={period}
			data-type={type}
			lang={lang}
			title={expansion}
			{...props}
		>
			{children}
		</abbr>
	)

	if (href) {
		return (
			<a href={href} class="abbreviation-link">
				{content}
			</a>
		)
	}

	return content
}
