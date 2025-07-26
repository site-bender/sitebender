import type {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Invoice from "../Invoice/index.ts"
import type Offer from "../Offer/index.ts"
import type OrderItem from "../OrderItem/index.ts"
import type OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import type Organization from "../../Organization/index.ts"
import type ParcelDelivery from "../ParcelDelivery/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type Person from "../../Person/index.ts"
import type PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"
import type Product from "../../Product/index.ts"
import type Service from "../Service/index.ts"

export interface OrderProps {
	acceptedOffer?: Offer
	billingAddress?: PostalAddress
	broker?: Organization | Person
	confirmationNumber?: Text
	customer?: Organization | Person
	discount?: Number | Text
	discountCode?: Text
	discountCurrency?: Text
	isGift?: Boolean
	merchant?: Organization | Person
	orderDate?: Date | DateTime
	orderDelivery?: ParcelDelivery
	orderedItem?: OrderItem | Product | Service
	orderNumber?: Text
	orderStatus?: OrderStatus
	partOfInvoice?: Invoice
	paymentDue?: DateTime
	paymentDueDate?: Date | DateTime
	paymentMethod?: PaymentMethod | Text
	paymentMethodId?: Text
	paymentUrl?: URL
	seller?: Organization | Person
}

type Order =
	& Thing
	& IntangibleProps
	& OrderProps

export default Order
