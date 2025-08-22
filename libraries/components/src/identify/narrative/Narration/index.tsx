import { CreativeWork, Person } from "../../../define/index.ts"

export default function Narration({
	children,
	element: Element = "div",
	define,
	narrator,
	narratorId,
	narratorType = "omniscient",
	perspective = "third-person",
	style = "descriptive",
	tense = "past",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"narration",
		perspective.replace("-", " "),
		narratorType !== "omniscient" && `${narratorType} narrator`,
		narrator && `by ${narrator}`,
		style !== "descriptive" && style.replace("-", " "),
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`narration narration-${style}`}
			data-narrator={narrator}
			data-narrator-id={narratorId}
			data-narrator-type={narratorType}
			data-perspective={perspective}
			data-style={style}
			data-tense={tense}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with CreativeWork and/or Person for definement
	if (define) {
		const workElement = (
			<CreativeWork
				text={children}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)

		if (narratorId && narrator) {
			return (
				<Person
					id={narratorId}
					name={narrator}
					disableJsonLd={define === "microdata"}
					disableMicrodata={define === "linkedData"}
				>
					{workElement}
				</Person>
			)
		}

		return workElement
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`narration narration-${style}`}
			data-narrator={narrator}
			data-narrator-id={narratorId}
			data-narrator-type={narratorType}
			data-perspective={perspective}
			data-style={style}
			data-tense={tense}
			itemProp="text"
			{...props}
		>
			{children}
		</Element>
	)
}
