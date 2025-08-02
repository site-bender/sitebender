import type BaseProps from "../../../../../types/index.ts"
import type HowToTipProps from "../../../../../types/Thing/Intangible/ListItem/HowToTip/index.ts"

import ListItem from "../index.tsx"

// HowToTip adds no properties to the ListItem schema type
export type Props = HowToTipProps & BaseProps

export default function HowToTip({
	_type = "HowToTip",
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
