import type { Boolean, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type DefinedRegion from "../DefinedRegion/index.ts"
import type Distance from "../../Quantity/Distance/index.ts"
import type Mass from "../../Quantity/Mass/index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ShippingDeliveryTime from "../ShippingDeliveryTime/index.ts"
import type ShippingRateSettings from "../ShippingRateSettings/index.ts"
import type ShippingService from "../ShippingService/index.ts"

import OfferShippingDetailsComponent from "../../../../../../components/Thing/Intangible/StructuredValue/OfferShippingDetails/index.tsx"

export interface OfferShippingDetailsProps {
	deliveryTime?: ShippingDeliveryTime
	depth?: Distance | QuantitativeValue
	doesNotShip?: Boolean
	hasShippingService?: ShippingService
	height?: Distance | QuantitativeValue
	shippingDestination?: DefinedRegion
	shippingLabel?: Text
	shippingOrigin?: DefinedRegion
	shippingRate?: MonetaryAmount | ShippingRateSettings
	shippingSettingsLink?: URL
	transitTimeLabel?: Text
	validForMemberTier?: MemberProgramTier
	weight?: Mass | QuantitativeValue
	width?: Distance | QuantitativeValue
}

type OfferShippingDetails =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& OfferShippingDetailsProps

export default OfferShippingDetails
