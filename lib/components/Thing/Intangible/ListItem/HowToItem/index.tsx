import type BaseProps from "../../../../../types/index.ts"
import type HowToItemProps from "../../../../../types/Thing/Intangible/ListItem/HowToItem/index.ts"

import ListItem from "../index.tsx"

export type Props = HowToItemProps & BaseProps

export default function HowToItem({
	requiredQuantity,
	_type = "HowToItem",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ListItem
			{...props}
			_type={_type}
			subtypeProperties={{
				requiredQuantity,
				...subtypeProperties,
			}}
		>{children}</ListItem>
	)
}
