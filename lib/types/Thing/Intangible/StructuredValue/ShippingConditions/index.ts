import type { Boolean } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type DefinedRegion from "../DefinedRegion/index.ts"
import type Distance from "../../Quantity/Distance/index.ts"
import type Mass from "../../Quantity/Mass/index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"
import type ShippingRateSettings from "../ShippingRateSettings/index.ts"

import ShippingConditionsComponent from "../../../../../../components/Thing/Intangible/StructuredValue/ShippingConditions/index.tsx"

export interface ShippingConditionsProps {
	depth?: Distance | QuantitativeValue
	doesNotShip?: Boolean
	height?: Distance | QuantitativeValue
	numItems?: QuantitativeValue
	orderValue?: MonetaryAmount
	seasonalOverride?: OpeningHoursSpecification
	shippingDestination?: DefinedRegion
	shippingOrigin?: DefinedRegion
	shippingRate?: MonetaryAmount | ShippingRateSettings
	transitTime?: QuantitativeValue | ServicePeriod
	weight?: Mass | QuantitativeValue
	width?: Distance | QuantitativeValue
}

type ShippingConditions =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingConditionsProps

export default ShippingConditions
