import { Person } from "../../../enrich/index.ts"

export default function CharacterName({
	characterId,
	children,
	element: Element = "span",
	enrich,
	fullName,
	nickname,
	role,
	title,
	...props
}: Props): JSX.Element {
	const displayName = children || fullName || nickname || ""
	const ariaLabel = [
		"character",
		fullName || displayName,
		nickname && fullName && `also known as ${nickname}`,
		role && `the ${role}`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="character-name"
			data-character-id={characterId}
			data-full-name={fullName}
			data-nickname={nickname}
			data-role={role}
			data-title={title}
			{...props}
		>
			{enrich ? <span itemProp="name">{displayName}</span> : displayName}
		</Element>
	)

	// Wrap with Person component if enriching
	if (enrich && characterId) {
		return (
			<Person
				id={characterId}
				name={fullName || displayName}
				alternateName={nickname}
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
			class="character-name"
			data-character-id={characterId}
			data-full-name={fullName}
			data-nickname={nickname}
			data-role={role}
			data-title={title}
			itemProp="character"
			{...props}
		>
			{displayName}
		</Element>
	)
}
