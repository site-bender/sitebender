import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type ItemListOrderTypeType = "ItemListOrderType"

export interface ItemListOrderTypeProps {
	"@type"?: ItemListOrderTypeType
}

type ItemListOrderType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ItemListOrderTypeProps

export default ItemListOrderType
