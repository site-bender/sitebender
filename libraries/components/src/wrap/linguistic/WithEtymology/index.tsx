/**
 * WithEtymology component
 *
 * Provides etymological information about words, including their
 * origins, root forms, and historical evolution. Useful for educational
 * content, dictionaries, and linguistic analysis.
 *
 * Example usage:
 *
 * <WithEtymology
 *   originLang="la"
 *   root="fortis"
 *   meaning="strong"
 *   ipa="/ˈfɔːr.teɪ/"
 * >
 *   forte
 * </WithEtymology>
 *
 * <WithEtymology
 *   originLang="grc"
 *   root="δημοκρατία"
 *   meaning="rule by the people"
 *   via={["fr", "en-ME"]}
 *   period="14th century"
 * >
 *   democracy
 * </WithEtymology>
 */
import type { BCP47LanguageTag } from "../../../../types/bcp47/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Cognates in related languages
	cognates?: Array<{ lang: BCP47LanguageTag; word: string }>
	// Description for accessibility
	description?: string
	element?: "div" | "span" | "i" | "em" | "dfn" | "cite"
	// IPA pronunciation of the etymon
	ipa?: string
	// Original meaning of the root
	meaning?: string
	// Language of origin
	originLang: BCP47LanguageTag
	// Time period of borrowing/formation
	period?: string
	// Root word or etymon
	root: string
	// Semantic evolution notes
	semanticShift?: string
	// Type of etymology
	type?:
		| "borrowing"
		| "compound"
		| "derivation"
		| "blend"
		| "calque"
		| "coinage"
	// Intermediate languages in borrowing chain
	via?: BCP47LanguageTag[]
}

export default function WithEtymology({
	children,
	cognates,
	description: _description,
	element: Element = "i",
	ipa,
	meaning,
	originLang,
	period,
	root,
	semanticShift,
	type = "borrowing",
	via,
	...props
}: Props): JSX.Element {
	const etymParts = [
		`from ${originLang}: ${root}`,
		meaning && `"${meaning}"`,
		via && via.length > 0 && `via ${via.join(", ")}`,
	].filter(Boolean)

	const ariaLabel = etymParts.join(", ")

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-etymology with-etymology-${type}`}
			data-cognates={cognates ? JSON.stringify(cognates) : undefined}
			data-ipa={ipa}
			data-meaning={meaning}
			data-origin-lang={originLang}
			data-period={period}
			data-root={root}
			data-semantic-shift={semanticShift}
			data-type={type}
			data-via={via ? via.join(",") : undefined}
			{...props}
		>
			{children}
		</Element>
	)
}
