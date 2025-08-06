/**
 * Neologism component
 *
 * Marks up newly coined words or expressions. Tracks when and how
 * the term was created, its formation type, and adoption status.
 * Useful for documenting language evolution and emerging terminology.
 *
 * Example usage:
 *
 * <Neologism coined="2020" type="blend">
 *   doomscrolling
 * </Neologism>
 *
 * <Neologism 
 *   coined="2019"
 *   by="Greta Thunberg"
 *   type="compound"
 *   definition="flight avoidance due to climate concerns"
 * >
 *   flygskam
 * </Neologism>
 *
 * <Neologism
 *   type="portmanteau"
 *   from={["glamorous", "camping"]}
 *   status="mainstream"
 * >
 *   glamping
 * </Neologism>
 */

export type FormationType = 
	| "blend"        // Parts of two words (brunch)
	| "portmanteau"  // Complete blend (spork)
	| "compound"     // Two whole words (smartphone)
	| "derivation"   // Affixes added (unfriend)
	| "acronym"      // From initials (radar)
	| "clipping"     // Shortened (app from application)
	| "conversion"   // Changed part of speech (to google)
	| "borrowing"    // From another language
	| "coinage"      // Completely new
	| "eponym"       // From person's name

export type AdoptionStatus = 
	| "emerging"     // Just appearing
	| "trending"     // Gaining popularity  
	| "established"  // Widely recognized
	| "mainstream"   // Fully adopted
	| "obsolete"     // No longer used

export type Props = {
	// Who coined the term
	by?: string
	children?: JSX.Element | Array<JSX.Element> | string
	// When it was coined
	coined?: string
	// Definition of the neologism
	definition?: string
	// Description for accessibility
	description?: string
	element?: "span" | "b" | "i" | "em" | "mark"
	// Source words for blends/compounds
	from?: string[]
	// Link to more information
	href?: string
	// Adoption status
	status?: AdoptionStatus
	// Formation type
	type?: FormationType
}

export default function Neologism({
	by,
	children,
	coined,
	definition,
	description,
	element: Element = "b",
	from,
	href,
	status = "emerging",
	type = "coinage",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"neologism",
		type !== "coinage" && type,
		coined && `coined ${coined}`,
		by && `by ${by}`,
		from && from.length > 0 && `from ${from.join(" + ")}`
	].filter(Boolean).join(", ")

	const title = definition || description || (from && `from ${from.join(" + ")}`)

	const content = (
		<Element
			aria-label={ariaLabel}
			class={`neologism neologism-${type} neologism-${status}`}
			data-by={by}
			data-coined={coined}
			data-definition={definition}
			data-from={from?.join(",")}
			data-status={status}
			data-type={type}
			title={title}
			{...props}
		>
			{children}
		</Element>
	)

	if (href) {
		return (
			<a href={href} class="neologism-link">
				{content}
			</a>
		)
	}

	return content
}