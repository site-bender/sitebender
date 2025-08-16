import { Person } from "../../../enrich/index.ts"

export default function CharacterRole({
	archetype,
	characterId,
	children,
	element: Element = "span",
	enrich,
	function: narrativeFunction,
	importance = "major",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"character role",
		narrativeFunction,
		archetype && `${archetype} archetype`,
		importance !== "major" && `${importance} character`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`character-role role-${narrativeFunction || "unspecified"}`}
			data-archetype={archetype}
			data-character-id={characterId}
			data-function={narrativeFunction}
			data-importance={importance}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with Person component if enriching
	if (enrich && characterId) {
		return (
			<Person
				id={characterId}
				name={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</Person>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`character-role role-${narrativeFunction || "unspecified"}`}
			data-archetype={archetype}
			data-character-id={characterId}
			data-function={narrativeFunction}
			data-importance={importance}
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}
