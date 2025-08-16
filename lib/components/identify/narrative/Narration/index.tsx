import { CreativeWork, Person } from "../../../enrich/index.ts"

export default function Narration({
	children,
	element: Element = "div",
	enrich,
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

	// Wrap with CreativeWork and/or Person for enrichment
	if (enrich) {
		const workElement = (
			<CreativeWork
				text={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)

		if (narratorId && narrator) {
			return (
				<Person
					id={narratorId}
					name={narrator}
					disableJsonLd={enrich === "microdata"}
					disableMicrodata={enrich === "linkedData"}
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
