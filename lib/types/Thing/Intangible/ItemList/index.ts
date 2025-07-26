import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type ItemListOrderType from "../Enumeration/ItemListOrderType/index.ts"
import type ListItem from "../ListItem/index.ts"

export interface ItemListProps {
	aggregateElement?: Thing
	itemListElement?: ListItem | Text | Thing
	itemListOrder?: ItemListOrderType | Text
	numberOfItems?: Integer
}

type ItemList =
	& Thing
	& IntangibleProps
	& ItemListProps

export default ItemList
