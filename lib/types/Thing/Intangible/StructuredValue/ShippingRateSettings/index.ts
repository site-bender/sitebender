import type { Boolean, Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type DefinedRegion from "../DefinedRegion/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type DeliveryChargeSpecification from "../PriceSpecification/DeliveryChargeSpecification/index.ts"

export interface ShippingRateSettingsProps {
	/** Indicates when shipping to a particular [[shippingDestination]] is not available. */
	doesNotShip?: Boolean
	/** A monetary value above (or at) which the shipping rate becomes free. Intended to be used via an [[OfferShippingDetails]] with [[shippingSettingsLink]] matching this [[ShippingRateSettings]]. */
	freeShippingThreshold?: DeliveryChargeSpecification | MonetaryAmount
	/** This can be marked 'true' to indicate that some published [[DeliveryTimeSettings]] or [[ShippingRateSettings]] are intended to apply to all [[OfferShippingDetails]] published by the same merchant, when referenced by a [[shippingSettingsLink]] in those settings. It is not meaningful to use a 'true' value for this property alongside a transitTimeLabel (for [[DeliveryTimeSettings]]) or shippingLabel (for [[ShippingRateSettings]]), since this property is for use with unlabelled settings. */
	isUnlabelledFallback?: Boolean
	/** Fraction of the value of the order that is charged as shipping cost. */
	orderPercentage?: Number
	/** indicates (possibly multiple) shipping destinations. These can be defined in several ways, e.g. postalCode ranges. */
	shippingDestination?: DefinedRegion
	/** The shipping rate is the cost of shipping to the specified destination. Typically, the maxValue and currency values (of the [[MonetaryAmount]]) are most appropriate. */
	shippingRate?: ShippingRateSettings | MonetaryAmount
	/** Fraction of the weight that is used to compute the shipping price. */
	weightPercentage?: Number
}

type ShippingRateSettings =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingRateSettingsProps

export default ShippingRateSettings
