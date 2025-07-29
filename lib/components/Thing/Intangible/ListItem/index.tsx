import type BaseProps from "../../../../types/index.ts"
import type ListItemProps from "../../../../types/Thing/Intangible/ListItem/index.ts"

import Intangible from "../index.tsx"

export type Props = ListItemProps & BaseProps

export default function ListItem({
	item,
	nextItem,
	position,
	previousItem,
	_type = "ListItem",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				item,
				nextItem,
				position,
				previousItem,
				...subtypeProperties,
			}}
		/>
	)
}
