import { Boolean } from "../../../../DataType/index.ts"
import Distance from "../../Quantity/Distance/index.ts"
import Mass from "../../Quantity/Mass/index.ts"
import DefinedRegion from "../DefinedRegion/index.ts"
import StructuredValue from "../index.ts"
import MonetaryAmount from "../MonetaryAmount/index.ts"
import OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import QuantitativeValue from "../QuantitativeValue/index.ts"
import ServicePeriod from "../ServicePeriod/index.ts"
import ShippingRateSettings from "../ShippingRateSettings/index.ts"

export default interface ShippingConditions extends StructuredValue {
	/** The depth of the item. */
	depth?: QuantitativeValue | Distance
	/** Indicates when shipping to a particular [[shippingDestination]] is not available. */
	doesNotShip?: Boolean
	/** The height of the item. */
	height?: Distance | QuantitativeValue
	/** Limits the number of items being shipped for which these conditions apply. */
	numItems?: QuantitativeValue
	/** Minimum and maximum order value for which these shipping conditions are valid. */
	orderValue?: MonetaryAmount
	/** Limited period during which these shipping conditions apply. */
	seasonalOverride?: OpeningHoursSpecification
	/** indicates (possibly multiple) shipping destinations. These can be defined in several ways, e.g. postalCode ranges. */
	shippingDestination?: DefinedRegion
	/** Indicates the origin of a shipment, i.e. where it should be coming from. */
	shippingOrigin?: DefinedRegion
	/** The shipping rate is the cost of shipping to the specified destination. Typically, the maxValue and currency values (of the [[MonetaryAmount]]) are most appropriate. */
	shippingRate?: ShippingRateSettings | MonetaryAmount
	/** The typical delay the order has been sent for delivery and the goods reach the final customer.    In the context of [[ShippingDeliveryTime]], use the [[QuantitativeValue]]. Typical properties: minValue, maxValue, unitCode (d for DAY).    In the context of [[ShippingConditions]], use the [[ServicePeriod]]. It has a duration (as a [[QuantitativeValue]]) and also business days and a cut-off time. */
	transitTime?: QuantitativeValue | ServicePeriod
	/** The weight of the product or person. */
	weight?: Mass | QuantitativeValue
	/** The width of the item. */
	width?: Distance | QuantitativeValue
}
