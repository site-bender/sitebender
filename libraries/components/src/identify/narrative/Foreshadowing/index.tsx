import { CreativeWork } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	element?:
		| keyof HTMLElementTagNameMap
		| ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	hint?: string
	event?: string
	strength?: "subtle" | "strong"
	children?: string
}

export default function Foreshadowing({
	children,
	element: Element = "span",
	define,
	subtlety = "moderate",
	type = "direct",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"foreshadowing",
		type !== "direct" && (type as string).replace("-", " "),
		subtlety !== "moderate" && `${subtlety} hint`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`foreshadowing foreshadowing-${type}`}
			data-subtlety={subtlety}
			data-type={type}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with CreativeWork for definement
	if (define) {
		return (
			<CreativeWork
				text={children}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`foreshadowing foreshadowing-${type}`}
			data-subtlety={subtlety}
			data-type={type}
			itemProp="hasPart"
			{...props}
		>
			{children}
		</Element>
	)
}
