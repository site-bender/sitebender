import { CreativeWork, Person } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	character?: string
	characterId?: string
	element?: keyof HTMLElementTagNameMap | ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	mood?: string
	style?: string
	children?: string
}

export default function InternalMonologue({
	character,
	characterId,
	children,
	element: Element = "span",
	define,
	mood,
	style = "reflective",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"internal monologue",
		character && `by ${character}`,
		style !== "reflective" && (style as string).replace("-", " "),
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

	// Wrap with CreativeWork and/or Person for definement
	if (define) {
		const workElement = (
			<CreativeWork
				text={typeof children === "string" ? children : undefined}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)

		if (characterId && character) {
			return (
				<Person
					identifier={characterId}
					name={typeof character === "string" ? character : undefined}
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
