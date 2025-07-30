import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface ItemListOrderTypeProps {
	"@type"?: "ItemListOrderType"}

type ItemListOrderType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ItemListOrderTypeProps

export default ItemListOrderType
