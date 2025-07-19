import type Thing from "../../../index.ts"
import type FulfillmentTypeEnumeration from "../../Enumeration/FulfillmentTypeEnumeration/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"
import type ShippingConditions from "../ShippingConditions/index.ts"

export interface ShippingServiceProps {
	/** Type of fulfillment applicable to the [[ShippingService]]. */
	fulfillmentType?: FulfillmentTypeEnumeration
	/** The typical delay between the receipt of the order and the goods either leaving the warehouse or being prepared for pickup, in case the delivery method is on site pickup.  In the context of [[ShippingDeliveryTime]], Typical properties: minValue, maxValue, unitCode (d for DAY).  This is by common convention assumed to mean business days (if a unitCode is used, coded as "d"), i.e. only counting days when the business normally operates.  In the context of [[ShippingService]], use the [[ServicePeriod]] format, that contains the same information in a structured form, with cut-off time, business days and duration. */
	handlingTime?: ServicePeriod | QuantitativeValue
	/** The conditions (constraints, price) applicable to the [[ShippingService]]. */
	shippingConditions?: ShippingConditions
	/** The membership program tier an Offer (or a PriceSpecification, OfferShippingDetails, or MerchantReturnPolicy under an Offer) is valid for. */
	validForMemberTier?: MemberProgramTier
}

type ShippingService =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingServiceProps

export default ShippingService
