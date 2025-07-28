import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import ItemAvailabilityComponent from "../../../../../../components/Thing/Intangible/Enumeration/ItemAvailability/index.tsx"

export interface ItemAvailabilityProps {
}

type ItemAvailability =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ItemAvailabilityProps

export default ItemAvailability
