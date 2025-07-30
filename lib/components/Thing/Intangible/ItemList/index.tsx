import type BaseProps from "../../../../types/index.ts"
import type ItemListProps from "../../../../types/Thing/Intangible/ItemList/index.ts"

import Intangible from "../index.tsx"

export type Props = ItemListProps & BaseProps

export default function ItemList({
	aggregateElement,
	itemListElement,
	itemListOrder,
	numberOfItems,
	_type = "ItemList",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				aggregateElement,
				itemListElement,
				itemListOrder,
				numberOfItems,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
