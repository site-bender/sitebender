import type BaseProps from "../../../../../types/index.ts"
import type OfferCatalogProps from "../../../../../types/Thing/Intangible/ItemList/OfferCatalog/index.ts"

import ItemList from "../index.tsx"

export type Props = OfferCatalogProps & BaseProps

export default function OfferCatalog({
	_type = "OfferCatalog",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ItemList
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
