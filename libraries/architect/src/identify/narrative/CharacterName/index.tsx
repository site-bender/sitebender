import Person from "../../../define/Thing/Person/index.tsx"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	characterId?: string
	element?:
		| keyof HTMLElementTagNameMap
		| ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	fullName?: string
	nickname?: string
	role?: string
	title?: string
	children?: unknown
}

export default function CharacterName({
	characterId,
	children,
	element: Element = "span",
	define,
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
			{define ? <span itemProp="name">{displayName}</span> : displayName}
		</Element>
	)

	// Wrap with Person component if defining
	if (define && characterId) {
		return (
			<Person
				identifier={characterId}
				name={typeof (fullName || displayName) === "string"
					? String(fullName || displayName)
					: undefined}
				alternateName={nickname}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
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
