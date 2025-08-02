import type BaseProps from "../../../../../types/index.ts"
import type HowToStepProps from "../../../../../types/Thing/Intangible/ListItem/HowToStep/index.ts"

import ListItem from "../index.tsx"

// HowToStep adds no properties to the ListItem schema type
export type Props = HowToStepProps & BaseProps

export default function HowToStep({
	_type = "HowToStep",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ListItem
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</ListItem>
	)
}
