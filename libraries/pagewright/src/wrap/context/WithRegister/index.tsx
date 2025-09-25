/**
 * WithRegister component
 *
 * Indicates the arboristic register or level of formality/style.
 * Helps AI understand the appropriate speaking style, vocabulary
 * choice, and grammatical structures for different social contexts.
 *
 * Example usage:
 *
 * <WithRegister
 *   level="colloquial"
 *   dialect="Southern US"
 * >
 *   Y'all come back now, ya hear?
 * </WithRegister>
 *
 * <WithRegister
 *   level="academic"
 *   field="medicine"
 * >
 *   The patient presented with acute myocardial infarction.
 * </WithRegister>
 */

export type RegisterLevel =
	| "frozen" // Ceremonial, unchanging (prayers, pledges)
	| "formal" // Academic, professional
	| "consultative" // Standard business, teaching
	| "casual" // Friends, colleagues
	| "intimate" // Family, close friends
	| "colloquial" // Everyday informal
	| "slang" // Very informal, group-specific
	| "vulgar" // Profane or taboo

export type Props = {
	// Age group appropriateness
	ageGroup?: "child" | "teen" | "young-adult" | "adult" | "elder"
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	// Regional or social dialect
	dialect?: string
	// Education level assumed
	education?:
		| "elementary"
		| "secondary"
		| "undergraduate"
		| "graduate"
		| "professional"
	element?: "div" | "span" | "p" | "quote" | "section"
	// Specialized field or domain
	field?: string
	// Jargon or specialized vocabulary level
	jargon?: "none" | "minimal" | "moderate" | "heavy"
	// Primary register level
	level: RegisterLevel | string
	// Time period (for historical registers)
	period?: string
	// Regional variety
	region?: string
}

export default function WithRegister({
	ageGroup,
	children,
	description: _description,
	dialect,
	education,
	element: Element = "span",
	field,
	jargon = "none",
	level,
	period,
	region,
	...props
}: Props): JSX.Element {
	const registerParts = [
		`register: ${level}`,
		field && `field: ${field}`,
		dialect && `dialect: ${dialect}`,
		region && `region: ${region}`,
	].filter(Boolean)

	const ariaLabel = registerParts.join(", ")

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-register with-register-${level}`}
			data-age-group={ageGroup}
			data-dialect={dialect}
			data-education={education}
			data-field={field}
			data-jargon={jargon}
			data-level={level}
			data-period={period}
			data-region={region}
			{...props}
		>
			{children}
		</Element>
	)
}
