/**
 * WithRhythm component
 *
 * Defines rhythmic patterns, meter, and cadence in speech or text.
 * Essential for poetry, rap, speeches, and any content where rhythm
 * enhances meaning or memorability. Supports both speech and musical contexts.
 *
 * Example usage:
 *
 * <WithRhythm
 *   meter="iambic-pentameter"
 *   feet={5}
 * >
 *   But soft, what light through yonder window breaks?
 * </WithRhythm>
 *
 * <WithRhythm
 *   pattern="stressed unstressed unstressed"
 *   repeat={3}
 *   style="waltz"
 * >
 *   ONE two three, ONE two three, ONE two three
 * </WithRhythm>
 */

export type Meter =
	| "iambic" // da-DUM
	| "trochaic" // DUM-da
	| "anapestic" // da-da-DUM
	| "dactylic" // DUM-da-da
	| "spondaic" // DUM-DUM
	| "pyrrhic" // da-da
	| "free-verse" // No fixed pattern
	| "blank-verse" // Unrhymed iambic pentameter

export type Props = {
	// Musical beats per minute
	bpm?: number
	// Rhythmic breaks or caesuras
	breaks?: string
	// Cadence type
	cadence?: "rising" | "falling" | "balanced" | "sprung"
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "div" | "span" | "p" | "verse" | "blockquote"
	// Emphasis pattern
	emphasis?: string
	// Number of metrical feet
	feet?: number
	// Specific meter type with feet (e.g., "iambic-pentameter")
	meter?: Meter | string
	// Custom stress pattern
	pattern?: string
	// Number of pattern repetitions
	repeat?: number
	// Rhyme scheme (e.g., "ABAB", "AABB")
	rhyme?: string
	// Musical or speech style
	style?: "prose" | "verse" | "rap" | "chant" | "song" | "waltz" | "march"
	// Syncopation present
	syncopated?: boolean
	// Time signature (musical)
	timeSignature?: string
}

export default function WithRhythm({
	bpm,
	breaks,
	cadence,
	children,
	description: _description,
	element: Element = "span",
	emphasis,
	feet,
	meter,
	pattern,
	repeat,
	rhyme,
	style = "prose",
	syncopated,
	timeSignature,
	...props
}: Props): JSX.Element {
	const rhythmParts = [
		meter && `meter: ${meter}`,
		feet && `${feet} feet`,
		style !== "prose" && `style: ${style}`,
		bpm && `${bpm} bpm`,
	].filter(Boolean)

	const ariaLabel = rhythmParts.length > 0
		? rhythmParts.join(", ")
		: undefined

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-rhythm with-rhythm-${style}`}
			data-bpm={bpm}
			data-breaks={breaks}
			data-cadence={cadence}
			data-emphasis={emphasis}
			data-feet={feet}
			data-meter={meter}
			data-pattern={pattern}
			data-repeat={repeat}
			data-rhyme={rhyme}
			data-style={style}
			data-syncopated={syncopated}
			data-time-signature={timeSignature}
			{...props}
		>
			{children}
		</Element>
	)
}
