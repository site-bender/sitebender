import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ItemListOrderType from "../Enumeration/ItemListOrderType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ListItem from "../ListItem/index.ts"
import type { BreadcrumbListType } from "./BreadcrumbList/index.ts"
import type { HowToSectionType } from "./HowToSection/index.ts"
import type { HowToStepType } from "./HowToStep/index.ts"
import type { OfferCatalogType } from "./OfferCatalog/index.ts"

import { Thing as ThingComponent } from "../../../../../components/index.tsx"
import { ItemListOrderType as ItemListOrderTypeComponent } from "../../../../../components/index.tsx"
import { ListItem as ListItemComponent } from "../../../../../components/index.tsx"

export type ItemListType =
	| "ItemList"
	| BreadcrumbListType
	| OfferCatalogType
	| HowToSectionType
	| HowToStepType

export interface ItemListProps {
	"@type"?: ItemListType
	aggregateElement?: Thing | ReturnType<typeof ThingComponent>
	itemListElement?:
		| ListItem
		| Text
		| Thing
		| ReturnType<typeof ListItemComponent>
		| ReturnType<typeof ThingComponent>
	itemListOrder?:
		| ItemListOrderType
		| Text
		| ReturnType<typeof ItemListOrderTypeComponent>
	numberOfItems?: Integer
}

type ItemList = Thing & IntangibleProps & ItemListProps

export default ItemList
