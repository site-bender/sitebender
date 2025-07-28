import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { ItemListProps } from "../../../../types/Thing/Intangible/ItemList/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ItemListProps,
	"ItemList",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function ItemList({
	aggregateElement,
	itemListElement,
	itemListOrder,
	numberOfItems,
	schemaType = "ItemList",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				aggregateElement,
				itemListElement,
				itemListOrder,
				numberOfItems,
				...subtypeProperties,
			}}
		/>
	)
}
