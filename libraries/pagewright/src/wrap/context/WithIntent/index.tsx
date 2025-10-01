//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type IntentPurpose =
	| "inform"
	| "persuade"
	| "entertain"
	| "educate"
	| "warn"
	| "request"
	| "command"
	| "suggest"
	| "question"
	| "express"
	| "negotiate"
	| "comfort"
	| "criticize"
	| "praise"

export type Props = {
	// Expected action from the audience
	action?: string
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "div" | "span" | "p" | "section" | "aside"
	// What response is expected
	expectation?:
		| "none"
		| "acknowledgment"
		| "response"
		| "action"
		| "consideration"
	// Hidden or implied meaning
	implication?: string
	// Primary purpose of the content
	purpose: IntentPurpose | string
	// Rhetorical strategy employed
	strategy?: "logos" | "ethos" | "pathos" | "kairos"
	// Intended target audience
	target?: string
	// Level of urgency
	urgency?: "low" | "medium" | "high" | "critical"
}

export default function WithIntent({
	action,
	children,
	description: _description,
	element: Element = "span",
	expectation = "none",
	implication,
	purpose,
	strategy,
	target,
	urgency,
	...props
}: Props): JSX.Element {
	const intentDescription = [
		`intent: ${purpose}`,
		expectation !== "none" && `expecting ${expectation}`,
		urgency && `urgency: ${urgency}`,
		target && `for: ${target}`,
	].filter(Boolean).join(", ")

	return (
		<Element
			aria-label={intentDescription}
			class={`with-intent with-intent-${purpose}`}
			data-action={action}
			data-expectation={expectation}
			data-implication={implication}
			data-purpose={purpose}
			data-strategy={strategy}
			data-target={target}
			data-urgency={urgency}
			{...props}
		>
			{children}
		</Element>
	)
}
