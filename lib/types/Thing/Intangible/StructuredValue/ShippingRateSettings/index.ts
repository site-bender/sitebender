import type { Boolean, Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type DefinedRegion from "../DefinedRegion/index.ts"
import type DeliveryChargeSpecification from "../PriceSpecification/DeliveryChargeSpecification/index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"

export interface ShippingRateSettingsProps {
	doesNotShip?: Boolean
	freeShippingThreshold?: DeliveryChargeSpecification | MonetaryAmount
	isUnlabelledFallback?: Boolean
	orderPercentage?: Number
	shippingDestination?: DefinedRegion
	shippingLabel?: Text
	shippingRate?: MonetaryAmount | ShippingRateSettings
	weightPercentage?: Number
}

type ShippingRateSettings =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingRateSettingsProps

export default ShippingRateSettings
