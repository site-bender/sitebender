import type { Boolean } from "../../../../DataType/index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type Distance from "../../Quantity/Distance/index.ts"
import type Mass from "../../Quantity/Mass/index.ts"
import type DefinedRegion from "../DefinedRegion/index.ts"
import type StructuredValue from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ShippingDeliveryTime from "../ShippingDeliveryTime/index.ts"
import type ShippingRateSettings from "../ShippingRateSettings/index.ts"
import type ShippingService from "../ShippingService/index.ts"

export default interface OfferShippingDetails extends StructuredValue {
	/** The total delay between the receipt of the order and the goods reaching the final customer. */
	deliveryTime?: ShippingDeliveryTime
	/** The depth of the item. */
	depth?: QuantitativeValue | Distance
	/** Indicates when shipping to a particular [[shippingDestination]] is not available. */
	doesNotShip?: Boolean
	/** Specification of a shipping service offered by the organization. */
	hasShippingService?: ShippingService
	/** The height of the item. */
	height?: Distance | QuantitativeValue
	/** indicates (possibly multiple) shipping destinations. These can be defined in several ways, e.g. postalCode ranges. */
	shippingDestination?: DefinedRegion
	/** Indicates the origin of a shipment, i.e. where it should be coming from. */
	shippingOrigin?: DefinedRegion
	/** The shipping rate is the cost of shipping to the specified destination. Typically, the maxValue and currency values (of the [[MonetaryAmount]]) are most appropriate. */
	shippingRate?: ShippingRateSettings | MonetaryAmount
	/** The membership program tier an Offer (or a PriceSpecification, OfferShippingDetails, or MerchantReturnPolicy under an Offer) is valid for. */
	validForMemberTier?: MemberProgramTier
	/** The weight of the product or person. */
	weight?: Mass | QuantitativeValue
	/** The width of the item. */
	width?: Distance | QuantitativeValue
}
