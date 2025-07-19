// OfferCatalog extends ItemList but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ItemListProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface OfferCatalogProps {}

type OfferCatalog =
	& Thing
	& IntangibleProps
	& ItemListProps
	& OfferCatalogProps

export default OfferCatalog
