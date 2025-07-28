import type { Boolean } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Distance from "../../Quantity/Distance/index.ts"
import type Mass from "../../Quantity/Mass/index.ts"
import type DefinedRegion from "../DefinedRegion/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"
import type ShippingRateSettings from "../ShippingRateSettings/index.ts"

import DistanceComponent from "../../../../../components/Thing/Intangible/Quantity/Distance/index.ts"
import MassComponent from "../../../../../components/Thing/Intangible/Quantity/Mass/index.ts"
import DefinedRegionComponent from "../../../../../components/Thing/Intangible/StructuredValue/DefinedRegion/index.ts"
import MonetaryAmountComponent from "../../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import OpeningHoursSpecificationComponent from "../../../../../components/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import ServicePeriodComponent from "../../../../../components/Thing/Intangible/StructuredValue/ServicePeriod/index.ts"
import ShippingRateSettingsComponent from "../../../../../components/Thing/Intangible/StructuredValue/ShippingRateSettings/index.ts"

export interface ShippingConditionsProps {
	depth?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	doesNotShip?: Boolean
	height?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	numItems?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
	orderValue?: MonetaryAmount | ReturnType<typeof MonetaryAmountComponent>
	seasonalOverride?:
		| OpeningHoursSpecification
		| ReturnType<typeof OpeningHoursSpecificationComponent>
	shippingDestination?:
		| DefinedRegion
		| ReturnType<typeof DefinedRegionComponent>
	shippingOrigin?: DefinedRegion | ReturnType<typeof DefinedRegionComponent>
	shippingRate?:
		| MonetaryAmount
		| ShippingRateSettings
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof ShippingRateSettingsComponent>
	transitTime?:
		| QuantitativeValue
		| ServicePeriod
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof ServicePeriodComponent>
	weight?:
		| Mass
		| QuantitativeValue
		| ReturnType<typeof MassComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	width?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
}

type ShippingConditions =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingConditionsProps

export default ShippingConditions
