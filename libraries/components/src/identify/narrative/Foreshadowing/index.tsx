import { CreativeWork } from "../../../define/index.ts"

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
		type !== "direct" && type.replace("-", " "),
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
