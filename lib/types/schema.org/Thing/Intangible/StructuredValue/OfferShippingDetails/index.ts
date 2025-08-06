import type { Boolean, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type Distance from "../../Quantity/Distance/index.ts"
import type Mass from "../../Quantity/Mass/index.ts"
import type DefinedRegion from "../DefinedRegion/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ShippingDeliveryTime from "../ShippingDeliveryTime/index.ts"
import type ShippingRateSettings from "../ShippingRateSettings/index.ts"
import type ShippingService from "../ShippingService/index.ts"

import { MemberProgramTier as MemberProgramTierComponent } from "../../../../../../components/index.tsx"
import { Distance as DistanceComponent } from "../../../../../../components/index.tsx"
import { Mass as MassComponent } from "../../../../../../components/index.tsx"
import { DefinedRegion as DefinedRegionComponent } from "../../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"
import { ShippingDeliveryTime as ShippingDeliveryTimeComponent } from "../../../../../../components/index.tsx"
import { ShippingRateSettings as ShippingRateSettingsComponent } from "../../../../../../components/index.tsx"
import { ShippingService as ShippingServiceComponent } from "../../../../../../components/index.tsx"

export type OfferShippingDetailsType = "OfferShippingDetails"

export interface OfferShippingDetailsProps {
	"@type"?: OfferShippingDetailsType
	deliveryTime?:
		| ShippingDeliveryTime
		| ReturnType<typeof ShippingDeliveryTimeComponent>
	depth?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	doesNotShip?: Boolean
	hasShippingService?:
		| ShippingService
		| ReturnType<typeof ShippingServiceComponent>
	height?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	shippingDestination?:
		| DefinedRegion
		| ReturnType<typeof DefinedRegionComponent>
	shippingLabel?: Text
	shippingOrigin?: DefinedRegion | ReturnType<typeof DefinedRegionComponent>
	shippingRate?:
		| MonetaryAmount
		| ShippingRateSettings
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof ShippingRateSettingsComponent>
	shippingSettingsLink?: URL
	transitTimeLabel?: Text
	validForMemberTier?:
		| MemberProgramTier
		| ReturnType<typeof MemberProgramTierComponent>
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

type OfferShippingDetails =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& OfferShippingDetailsProps

export default OfferShippingDetails
