import { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import DeliveryEvent from "../../Event/DeliveryEvent/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import Product from "../../Product/index.ts"
import DeliveryMethod from "../Enumeration/DeliveryMethod/index.ts"
import Intangible from "../index.ts"
import Order from "../Order/index.ts"
import PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"

export default interface ParcelDelivery extends Intangible {
	/** 'carrier' is an out-dated term indicating the 'provider' for parcel delivery and flights. */
	carrier?: Organization
	/** Destination address. */
	deliveryAddress?: PostalAddress
	/** New entry added as the package passes through each leg of its journey (from shipment to final delivery). */
	deliveryStatus?: DeliveryEvent
	/** The earliest date the package may arrive. */
	expectedArrivalFrom?: Date | DateTime
	/** The latest date the package may arrive. */
	expectedArrivalUntil?: Date | DateTime
	/** Method used for delivery or shipping. */
	hasDeliveryMethod?: DeliveryMethod
	/** Item(s) being shipped. */
	itemShipped?: Product
	/** Shipper's address. */
	originAddress?: PostalAddress
	/** The overall order the items in this delivery were included in. */
	partOfOrder?: Order
	/** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
	provider?: Organization | Person
	/** Shipper tracking number. */
	trackingNumber?: Text
	/** Tracking url for the parcel delivery. */
	trackingUrl?: URL
}
