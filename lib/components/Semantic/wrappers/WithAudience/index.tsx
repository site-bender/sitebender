/**
 * WithAudience component
 *
 * Specifies the intended audience for content, helping AI systems
 * adjust language, complexity, and cultural references appropriately.
 * Useful for educational content, marketing, and adaptive interfaces.
 *
 * Example usage:
 *
 * <WithAudience 
 *   age="5-8" 
 *   expertise="beginner"
 *   interests="dinosaurs"
 * >
 *   T-Rex was a very big dinosaur with sharp teeth!
 * </WithAudience>
 *
 * <WithAudience 
 *   profession="software-engineers"
 *   expertise="expert"
 *   familiarity="high"
 * >
 *   The algorithm has O(n log n) time complexity.
 * </WithAudience>
 */

export type ExpertiseLevel = 
	| "novice"
	| "beginner"
	| "intermediate" 
	| "advanced"
	| "expert"

export type Props = {
	// Age range (e.g., "5-8", "13-17", "18+", "65+")
	age?: string
	// Assumed background knowledge
	background?: string
	children?: JSX.Element | Array<JSX.Element> | string
	// Cultural group or region
	culture?: string
	// Description for accessibility
	description?: string
	// Educational level
	education?: string
	element?: "div" | "span" | "section" | "article" | "aside"
	// Level of expertise in subject
	expertise?: ExpertiseLevel | string
	// Familiarity with topic (how much context needed)
	familiarity?: "none" | "low" | "medium" | "high"
	// Specific group identifier
	group?: string
	// Interests or hobbies
	interests?: string
	// Language proficiency level
	language?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native"
	// Relationship to speaker/author
	relationship?: "stranger" | "acquaintance" | "colleague" | "friend" | "family"
	// Professional field
	profession?: string
	// Size of audience
	size?: "individual" | "small-group" | "large-group" | "mass"
}

export default function WithAudience({
	age,
	background,
	children,
	culture,
	description,
	education,
	element: Element = "span",
	expertise,
	familiarity = "medium",
	group,
	interests,
	language,
	profession,
	relationship,
	size = "individual",
	...props
}: Props): JSX.Element {
	const audienceParts = [
		age && `age: ${age}`,
		expertise && `expertise: ${expertise}`,
		profession && `profession: ${profession}`,
		size !== "individual" && `audience size: ${size}`
	].filter(Boolean)
	
	const ariaLabel = audienceParts.length > 0
		? `for ${audienceParts.join(", ")}`
		: undefined

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-audience with-audience-${expertise || "general"}`}
			data-age={age}
			data-background={background}
			data-culture={culture}
			data-education={education}
			data-expertise={expertise}
			data-familiarity={familiarity}
			data-group={group}
			data-interests={interests}
			data-language={language}
			data-profession={profession}
			data-relationship={relationship}
			data-size={size}
			{...props}
		>
			{children}
		</Element>
	)
}