import { Person } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	characterId?: string
	element?: keyof HTMLElementTagNameMap | ((props: any) => any)
	define?: "microdata" | "linkedData" | "both"
	motivation?: string
	redeemable?: boolean
	type?: "character" | string
	children?: any
}

export default function Antagonist({
	characterId,
	children,
	element: Element = "span",
	define,
	motivation,
	redeemable = false,
	type = "character",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"antagonist",
		type !== "character" && `${type} antagonist`,
		motivation && `motivated by ${motivation}`,
		redeemable && "redeemable",
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="antagonist character-role"
			data-character-id={characterId}
			data-motivation={motivation}
			data-redeemable={redeemable}
			data-role="antagonist"
			data-type={type}
			{...props}
		>
			{define && type === "character"
				? <span itemProp="name">{children}</span>
				: children}
		</Element>
	)

	// Wrap with Person component if defineing and it's a character
	if (define && characterId && type === "character") {
		return (
			<Person
				id={characterId}
				name={children}
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
			class="antagonist character-role"
			data-character-id={characterId}
			data-motivation={motivation}
			data-redeemable={redeemable}
			data-role="antagonist"
			data-type={type}
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}
