import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ItemListOrderType from "../Enumeration/ItemListOrderType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ListItem from "../ListItem/index.ts"

import ThingComponent from "../../../../components/Thing/index.ts"
import ItemListOrderTypeComponent from "../../../../components/Thing/Intangible/Enumeration/ItemListOrderType/index.ts"
import ListItemComponent from "../../../../components/Thing/Intangible/ListItem/index.ts"

export interface ItemListProps {
	"@type"?: "ItemList"
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
