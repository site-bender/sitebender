import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import ItemListOrderTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/ItemListOrderType/index.tsx"

export interface ItemListOrderTypeProps {
}

type ItemListOrderType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ItemListOrderTypeProps

export default ItemListOrderType
