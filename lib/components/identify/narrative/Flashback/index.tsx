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
		const eventElement = timeShift
			? (
				<Event
					name={`Flashback to ${timeShift}`}
					description={typeof children === "string" ? children : undefined}
					disableJsonLd={enrich === "microdata"}
					disableMicrodata={enrich === "linkedData"}
				>
					{baseElement}
				</Event>
			)
			: (
				<CreativeWork
					text={typeof children === "string" ? children : undefined}
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
