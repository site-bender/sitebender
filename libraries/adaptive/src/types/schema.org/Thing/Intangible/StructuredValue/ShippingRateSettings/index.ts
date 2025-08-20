import type { Boolean, Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type DefinedRegion from "../DefinedRegion/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type DeliveryChargeSpecification from "../PriceSpecification/DeliveryChargeSpecification/index.ts"

import { DefinedRegion as DefinedRegionComponent } from "../../../../../../components/index.tsx"
import { DeliveryChargeSpecification as DeliveryChargeSpecificationComponent } from "../../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../../components/index.tsx"
import { ShippingRateSettings as ShippingRateSettingsComponent } from "../../../../../../components/index.tsx"

export type ShippingRateSettingsType = "ShippingRateSettings"

export interface ShippingRateSettingsProps {
	"@type"?: ShippingRateSettingsType
	doesNotShip?: Boolean
	freeShippingThreshold?:
		| DeliveryChargeSpecification
		| MonetaryAmount
		| ReturnType<typeof DeliveryChargeSpecificationComponent>
		| ReturnType<typeof MonetaryAmountComponent>
	isUnlabelledFallback?: Boolean
	orderPercentage?: Number
	shippingDestination?:
		| DefinedRegion
		| ReturnType<typeof DefinedRegionComponent>
	shippingLabel?: Text
	shippingRate?:
		| MonetaryAmount
		| ShippingRateSettings
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof ShippingRateSettingsComponent>
	weightPercentage?: Number
}

type ShippingRateSettings =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingRateSettingsProps

export default ShippingRateSettings
