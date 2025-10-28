import type { Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"

import DayOfWeekComponent from "../../../../../../../architect/src/define/Thing/Intangible/Enumeration/DayOfWeek/index.tsx"
import OpeningHoursSpecificationComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.tsx"
import QuantitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import ServicePeriodComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/ServicePeriod/index.tsx"

export type ShippingDeliveryTimeType = "ShippingDeliveryTime"

export interface ShippingDeliveryTimeProps {
	"@type"?: ShippingDeliveryTimeType
	businessDays?:
		| DayOfWeek
		| OpeningHoursSpecification
		| ReturnType<typeof DayOfWeekComponent>
		| ReturnType<typeof OpeningHoursSpecificationComponent>
	cutoffTime?: Time
	handlingTime?:
		| QuantitativeValue
		| ServicePeriod
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof ServicePeriodComponent>
	transitTime?:
		| QuantitativeValue
		| ServicePeriod
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof ServicePeriodComponent>
}

type ShippingDeliveryTime =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingDeliveryTimeProps

export default ShippingDeliveryTime
