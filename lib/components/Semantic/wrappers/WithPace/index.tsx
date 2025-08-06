/**
 * WithPace component
 *
 * Controls the tempo and rhythm of speech delivery. Essential for
 * dramatic readings, emphasis, and natural speech patterns. Can
 * indicate pauses, speed changes, and rhythmic patterns.
 *
 * Example usage:
 *
 * <WithPace speed="slow" pause-before="long">
 *   I... never... saw... it... coming.
 * </WithPace>
 *
 * <WithPace 
 *   speed="fast" 
 *   rhythm="staccato"
 *   breathless
 * >
 *   Quick! We need to get out of here right now!
 * </WithPace>
 */

export type Speed = 
	| "x-slow"
	| "slow" 
	| "medium-slow"
	| "medium"
	| "medium-fast"
	| "fast"
	| "x-fast"

export type PauseDuration = 
	| "x-short"  // ~100ms
	| "short"    // ~250ms
	| "medium"   // ~500ms
	| "long"     // ~1000ms
	| "x-long"   // ~2000ms

export type Props = {
	// Accelerating pace
	accelerate?: boolean
	// Out of breath quality
	breathless?: boolean
	children?: JSX.Element | Array<JSX.Element> | string
	// Decelerating pace
	decelerate?: boolean
	// Description for accessibility
	description?: string
	element?: "div" | "span" | "p" | "em" | "strong"
	// Pause after content
	pauseAfter?: PauseDuration | number
	// Pause before content
	pauseBefore?: PauseDuration | number
	// Rhythmic pattern
	rhythm?: "regular" | "irregular" | "staccato" | "legato" | "syncopated"
	// Overall speed
	speed?: Speed | string
	// Specific timing in milliseconds
	timing?: number
	// Variable pacing
	variable?: boolean
}

export default function WithPace({
	accelerate,
	breathless,
	children,
	decelerate,
	description,
	element: Element = "span",
	pauseAfter,
	pauseBefore,
	rhythm,
	speed = "medium",
	timing,
	variable,
	...props
}: Props): JSX.Element {
	const paceAttributes = [
		`pace: ${speed}`,
		rhythm && `rhythm: ${rhythm}`,
		accelerate && "accelerating",
		decelerate && "decelerating",
		breathless && "breathless"
	].filter(Boolean)
	
	const ariaLabel = paceAttributes.join(", ")

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-pace with-pace-${speed}`}
			data-accelerate={accelerate}
			data-breathless={breathless}
			data-decelerate={decelerate}
			data-pause-after={pauseAfter}
			data-pause-before={pauseBefore}
			data-rhythm={rhythm}
			data-speed={speed}
			data-timing={timing}
			data-variable={variable}
			{...props}
		>
			{children}
		</Element>
	)
}