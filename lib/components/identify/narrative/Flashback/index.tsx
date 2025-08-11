/**
 * Flashback component
 *
 * Wraps a flashback sequence in narrative text. Provides semantic identification
 * of temporal shifts to earlier events in the story. The wrapper approach ensures
 * proper structure and clear boundaries for the flashback content.
 *
 * Example usage:
 *
 * <Flashback>
 *   She remembered the day they first met...
 * </Flashback>
 *
 * <Flashback
 *   timeShift="10 years earlier"
 *   trigger="photograph"
 * >
 *   <p>The summer of 1962 had been uncommonly hot.</p>
 *   <p>Young Sarah ran through the sprinklers...</p>
 * </Flashback>
 *
 * <Flashback
 *   timeShift="childhood"
 *   trigger="smell"
 *   transitionStyle="dissolve"
 *   element="aside"
 *   enrich="both"
 * >
 *   <SceneSetting>Her grandmother's kitchen, 1975</SceneSetting>
 *   <Narration>The aroma of fresh-baked cookies filled the air...</Narration>
 * </Flashback>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// HTML element to use
	element?: "div" | "aside" | "section" | "blockquote"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Description of the time period being flashed back to
	timeShift?: string
	// Visual/narrative style of transition
	transitionStyle?: "fade" | "dissolve" | "ripple" | "abrupt" | "gradual"
	// What triggered the flashback
	trigger?: "memory" | "object" | "sound" | "smell" | "dialogue" | "dream" | "trauma"
}

import { CreativeWork, Event } from "../../../enrich/index.ts"

export default function Flashback({
	children,
	element: Element = "aside",
	enrich,
	timeShift,
	transitionStyle = "fade",
	trigger,
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"flashback",
		timeShift && `to ${timeShift}`,
		trigger && `triggered by ${trigger}`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`flashback flashback-${transitionStyle}`}
			data-time-shift={timeShift}
			data-transition-style={transitionStyle}
			data-trigger={trigger}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with Event and CreativeWork for enrichment
	if (enrich) {
		const eventElement = timeShift ? (
			<Event
				name={`Flashback to ${timeShift}`}
				description={typeof children === 'string' ? children : undefined}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</Event>
		) : (
			<CreativeWork
				text={typeof children === 'string' ? children : undefined}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)

		return eventElement
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`flashback flashback-${transitionStyle}`}
			data-time-shift={timeShift}
			data-transition-style={transitionStyle}
			data-trigger={trigger}
			itemProp="hasPart"
			{...props}
		>
			{children}
		</Element>
	)
}