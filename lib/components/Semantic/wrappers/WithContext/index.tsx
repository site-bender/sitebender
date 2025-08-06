/**
 * WithContext component
 *
 * Provides contextual metadata about the circumstances or environment
 * in which content appears. Useful for indicating setting, time period,
 * cultural context, or situational framing that affects interpretation.
 *
 * Example usage:
 *
 * <WithContext 
 *   setting="Victorian England" 
 *   period="1880s"
 *   situation="formal dinner"
 * >
 *   "I say, old chap, rather inclement weather we're having!"
 * </WithContext>
 *
 * <WithContext cultural="Japanese" formality="keigo">
 *   お元気ですか？
 * </WithContext>
 */

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Cultural or regional context
	cultural?: string
	// Description for accessibility
	description?: string
	element?: "div" | "span" | "section" | "article" | "blockquote" | "p"
	// Level of formality
	formality?: "informal" | "casual" | "neutral" | "formal" | "ceremonial"
	// Historical period or era
	period?: string
	// Physical or virtual setting
	setting?: string
	// Specific situation or circumstance
	situation?: string
	// Type of context
	type?: "historical" | "cultural" | "situational" | "fictional" | "technical"
}

export default function WithContext({
	children,
	cultural,
	description,
	element: Element = "span",
	formality,
	period,
	setting,
	situation,
	type = "situational",
	...props
}: Props): JSX.Element {
	const contextParts = []
	if (setting) contextParts.push(`setting: ${setting}`)
	if (period) contextParts.push(`period: ${period}`)
	if (cultural) contextParts.push(`cultural context: ${cultural}`)
	if (situation) contextParts.push(`situation: ${situation}`)
	if (formality) contextParts.push(`formality: ${formality}`)
	
	const ariaLabel = contextParts.length > 0 
		? contextParts.join(", ")
		: undefined

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-context with-context-${type}`}
			data-context-type={type}
			data-cultural={cultural}
			data-formality={formality}
			data-period={period}
			data-setting={setting}
			data-situation={situation}
			{...props}
		>
			{children}
		</Element>
	)
}