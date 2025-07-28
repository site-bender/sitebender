import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ItemListProps } from "../index.ts"

import OfferCatalogComponent from "../../../../../../components/Thing/Intangible/ItemList/OfferCatalog/index.tsx"

export interface OfferCatalogProps {
}

type OfferCatalog =
	& Thing
	& IntangibleProps
	& ItemListProps
	& OfferCatalogProps

export default OfferCatalog
