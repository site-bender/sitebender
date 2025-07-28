import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ListItemProps } from "../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"

import HowToItemComponent from "../../../../../../components/Thing/Intangible/ListItem/HowToItem/index.tsx"

export interface HowToItemProps {
	requiredQuantity?: Number | QuantitativeValue | Text
}

type HowToItem =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToItemProps

export default HowToItem
