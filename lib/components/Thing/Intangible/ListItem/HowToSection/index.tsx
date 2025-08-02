import type BaseProps from "../../../../../types/index.ts"
import type HowToSectionProps from "../../../../../types/Thing/Intangible/ListItem/HowToSection/index.ts"

import ListItem from "../index.tsx"

// HowToSection adds no properties to the ListItem schema type
export type Props = HowToSectionProps & BaseProps

export default function HowToSection(
	{
		steps,
		_type = "HowToSection",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<ListItem
			{...props}
			_type={_type}
			subtypeProperties={{
				steps,
				...subtypeProperties,
			}}
		>
			{children}
		</ListItem>
	)
}
