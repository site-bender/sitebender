import { CreativeWork, Person } from "../../../enrich/index.ts"

export default function InternalMonologue({
	character,
	characterId,
	children,
	element: Element = "span",
	enrich,
	mood,
	style = "reflective",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"internal monologue",
		character && `by ${character}`,
		style !== "reflective" && style.replace("-", " "),
		mood && `${mood} mood`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`internal-monologue monologue-${style}`}
			data-character={character}
			data-character-id={characterId}
			data-mood={mood}
			data-style={style}
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

		if (characterId && character) {
			return (
				<Person
					id={characterId}
					name={character}
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
			class={`internal-monologue monologue-${style}`}
			data-character={character}
			data-character-id={characterId}
			data-mood={mood}
			data-style={style}
			itemProp="text"
			{...props}
		>
			{children}
		</Element>
	)
}
