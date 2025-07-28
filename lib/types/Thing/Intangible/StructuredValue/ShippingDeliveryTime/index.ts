import type { Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"

import ShippingDeliveryTimeComponent from "../../../../../../components/Thing/Intangible/StructuredValue/ShippingDeliveryTime/index.tsx"

export interface ShippingDeliveryTimeProps {
	businessDays?: DayOfWeek | OpeningHoursSpecification
	cutoffTime?: Time
	handlingTime?: QuantitativeValue | ServicePeriod
	transitTime?: QuantitativeValue | ServicePeriod
}

type ShippingDeliveryTime =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingDeliveryTimeProps

export default ShippingDeliveryTime
