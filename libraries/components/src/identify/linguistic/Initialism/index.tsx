/**
 * Initialism component
 *
 * Marks up initialisms - abbreviations pronounced letter by letter
 * rather than as words. Provides expansion and proper spacing hints
 * for screen readers and speech synthesis.
 *
 * Example usage:
 *
 * <Initialism expansion="Federal Bureau of Investigation">
 *   FBI
 * </Initialism>
 *
 * <Initialism
 *   expansion="Hypertext Markup Language"
 *   field="technology"
 * >
 *   HTML
 * </Initialism>
 *
 * <Initialism
 *   expansion="United Kingdom"
 *   spacing="grouped"
 * >
 *   UK
 * </Initialism>
 */
import type { BCP47LanguageTag } from "../../../../../../types/bcp47/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	// Full expansion
	expansion: string
	// Field or domain
	field?: string
	// Link to definition
	href?: string
	// Language
	lang?: BCP47LanguageTag
	// Letter spacing hint for speech
	spacing?: "individual" | "grouped" | "pairs"
	// Whether to include periods
	withPeriods?: boolean
}

export default function Initialism({
	children,
	description,
	expansion,
	field,
	href,
	lang,
	spacing = "individual",
	withPeriods = false,
	...props
}: Props): JSX.Element {
	const letterSpacing = {
		individual: "spell out each letter",
		grouped: "pronounce as group",
		pairs: "pronounce in pairs",
	}

	const ariaLabel = [
		"initialism",
		expansion,
		letterSpacing[spacing],
	].filter(Boolean).join(", ")

	const content = (
		<abbr
			aria-label={ariaLabel}
			class={`initialism initialism-${spacing}`}
			data-expansion={expansion}
			data-field={field}
			data-spacing={spacing}
			data-with-periods={withPeriods}
			lang={lang}
			title={expansion}
			{...props}
		>
			{children}
		</abbr>
	)

	if (href) {
		return (
			<a href={href} class="initialism-link">
				{content}
			</a>
		)
	}

	return content
}
