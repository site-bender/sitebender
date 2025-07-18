import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ItemListProps from "../../../../../types/Thing/ItemList/index.ts"
import type OfferCatalogProps from "../../../../../types/Thing/OfferCatalog/index.ts"

import ItemList from "../index.tsx"

// OfferCatalog adds no properties to the ItemList schema type
export type Props = BaseComponentProps<
	OfferCatalogProps,
	"OfferCatalog",
	ExtractLevelProps<OfferCatalogProps, ItemListProps>
>

export default function OfferCatalog({
	schemaType = "OfferCatalog",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ItemList
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
