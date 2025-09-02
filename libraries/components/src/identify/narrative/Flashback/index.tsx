import { CreativeWork, Event } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	element?:
		| keyof HTMLElementTagNameMap
		| ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	timeShift?: string
	transitionStyle?: string
	trigger?: string
	children?: unknown
}

export default function Flashback({
	children,
	element: Element = "aside",
	define,
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

	// Wrap with Event and CreativeWork for definement
	if (define) {
		const eventElement = timeShift
			? (
				<Event
					name={`Flashback to ${timeShift}`}
					description={typeof children === "string" ? children : undefined}
					disableJsonLd={define === "microdata"}
					disableMicrodata={define === "linkedData"}
				>
					{baseElement}
				</Event>
			)
			: (
				<CreativeWork
					text={typeof children === "string" ? children : undefined}
					disableJsonLd={define === "microdata"}
					disableMicrodata={define === "linkedData"}
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
