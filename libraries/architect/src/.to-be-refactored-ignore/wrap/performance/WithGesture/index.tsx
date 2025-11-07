//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	// Specific gesture action
	action?: string
	// Body posture or stance
	body?: string
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	// Direction of gesture
	direction?: "up" | "down" | "left" | "right" | "forward" | "backward"
	element?: "div" | "span" | "em" | "i" | "mark"
	// Overall emotional expression
	expression?: string
	// Eye movement or gaze
	eyes?: string
	// Facial expression
	facial?: string
	// Hand position or movement
	hands?: string
	// Head movement
	head?: string
	// Intensity of gesture
	intensity?: "subtle" | "moderate" | "emphatic" | "dramatic"
	// Gesture repetition
	repeat?: number
	// Shoulders position
	shoulders?: string
	// Timing relative to speech
	timing?: "before" | "during" | "after" | "throughout"
}

export default function WithGesture({
	action,
	body,
	children,
	description: _description,
	direction,
	element: Element = "span",
	expression,
	eyes,
	facial,
	hands,
	head,
	intensity = "moderate",
	repeat,
	shoulders,
	timing = "during",
	...props
}: Props): JSX.Element {
	const gestureParts = [
		action && `gesture: ${action}`,
		facial && `facial: ${facial}`,
		expression && `expression: ${expression}`,
		intensity !== "moderate" && `intensity: ${intensity}`,
	].filter(Boolean)

	const ariaLabel = gestureParts.length > 0
		? gestureParts.join(", ")
		: undefined

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-gesture with-gesture-${intensity}`}
			data-action={action}
			data-body={body}
			data-direction={direction}
			data-expression={expression}
			data-eyes={eyes}
			data-facial={facial}
			data-hands={hands}
			data-head={head}
			data-intensity={intensity}
			data-repeat={repeat}
			data-shoulders={shoulders}
			data-timing={timing}
			{...props}
		>
			{children}
		</Element>
	)
}
