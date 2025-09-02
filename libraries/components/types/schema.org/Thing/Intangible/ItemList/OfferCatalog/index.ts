import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ItemListProps } from "../index.ts"

export type OfferCatalogType = "OfferCatalog"

export interface OfferCatalogProps {
	"@type"?: OfferCatalogType
}

type OfferCatalog = Thing & IntangibleProps & ItemListProps & OfferCatalogProps

export default OfferCatalog
