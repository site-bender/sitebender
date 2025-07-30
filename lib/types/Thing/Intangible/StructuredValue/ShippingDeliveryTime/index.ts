import type { Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"

import DayOfWeekComponent from "../../../../../components/Thing/Intangible/Enumeration/DayOfWeek/index.ts"
import OpeningHoursSpecificationComponent from "../../../../../components/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import ServicePeriodComponent from "../../../../../components/Thing/Intangible/StructuredValue/ServicePeriod/index.ts"

export interface ShippingDeliveryTimeProps {
	"@type"?: "ShippingDeliveryTime"
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
