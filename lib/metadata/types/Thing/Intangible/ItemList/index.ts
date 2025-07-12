import type { Integer, Text } from "../../../DataType/index.ts"
import type { Thing } from "../../index.ts"
import type { Intangible } from "../index.ts"
import type { ListItem } from "../ListItem/index.ts"

// ItemList interface - extends Intangible
// A list of items of any sort—for example, Top 10 Movies About Weathermen, or Top 100 Party Songs.
// Not to be confused with HTML lists, which are often used only for formatting.
export interface ItemList extends Intangible {
	aggregateElement?: Thing
	itemListElement?: ListItem | Text | Thing
	itemListOrder?: ItemListOrderType | Text
	numberOfItems?: Integer
}

// ItemListOrderType enumeration type
export type ItemListOrderType = string
