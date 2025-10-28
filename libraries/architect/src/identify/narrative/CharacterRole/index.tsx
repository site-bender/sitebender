import Person from "../../../define/Thing/Person/index.tsx"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	characterId?: string
	element?:
		| keyof HTMLElementTagNameMap
		| ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	role?: string
	children?: unknown
}

export default function CharacterRole({
	archetype,
	characterId,
	children,
	element: Element = "span",
	define,
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

	// Wrap with Person component if defineing
	if (define && characterId) {
		return (
			<Person
				identifier={characterId}
				name={typeof children === "string" ? children : undefined}
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
