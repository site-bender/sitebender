import { Person } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	characterId?: string
	element?: keyof HTMLElementTagNameMap | ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	function?: string
	presence?: string
	fate?: string
	children?: string
}

export default function SideCharacter({
	characterId,
	children,
	element: Element = "span",
	define,
	fate,
	function: characterFunction,
	presence = "recurring",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"side character",
		characterFunction && (characterFunction as string).replace("-", " "),
		presence !== "recurring" && `${presence} appearance`,
		fate && `${fate} by story's end`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="side-character character-role"
			data-character-id={characterId}
			data-fate={fate}
			data-function={characterFunction}
			data-presence={presence}
			data-role="side-character"
			{...props}
		>
			{define ? <span itemProp="name">{children}</span> : children}
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
			class="side-character character-role"
			data-character-id={characterId}
			data-fate={fate}
			data-function={characterFunction}
			data-presence={presence}
			data-role="side-character"
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}
