import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type DeliveryEvent from "../../Event/DeliveryEvent/index.ts"
import type DeliveryMethod from "../Enumeration/DeliveryMethod/index.ts"
import type Order from "../Order/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"
import type Product from "../../Product/index.ts"

import ParcelDeliveryComponent from "../../../../../components/Thing/Intangible/ParcelDelivery/index.tsx"

export interface ParcelDeliveryProps {
	carrier?: Organization
	deliveryAddress?: PostalAddress
	deliveryStatus?: DeliveryEvent
	expectedArrivalFrom?: Date | DateTime
	expectedArrivalUntil?: Date | DateTime
	hasDeliveryMethod?: DeliveryMethod
	itemShipped?: Product
	originAddress?: PostalAddress
	partOfOrder?: Order
	provider?: Organization | Person
	trackingNumber?: Text
	trackingUrl?: URL
}

type ParcelDelivery =
	& Thing
	& IntangibleProps
	& ParcelDeliveryProps

export default ParcelDelivery
