import type {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Product from "../../Product/index.ts"
import type OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Invoice from "../Invoice/index.ts"
import type Offer from "../Offer/index.ts"
import type OrderItem from "../OrderItem/index.ts"
import type ParcelDelivery from "../ParcelDelivery/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type Service from "../Service/index.ts"
import type PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"

import OrderStatusComponent from "../../../../../src/define/Thing/Intangible/Enumeration/StatusEnumeration/OrderStatus/index.tsx"
import InvoiceComponent from "../../../../../src/define/Thing/Intangible/Invoice/index.tsx"
import OfferComponent from "../../../../../src/define/Thing/Intangible/Offer/index.tsx"
import OrderItemComponent from "../../../../../src/define/Thing/Intangible/OrderItem/index.tsx"
import ParcelDeliveryComponent from "../../../../../src/define/Thing/Intangible/ParcelDelivery/index.tsx"
import PaymentMethodComponent from "../../../../../src/define/Thing/Intangible/PaymentMethod/index.tsx"
import ServiceComponent from "../../../../../src/define/Thing/Intangible/Service/index.tsx"
import PostalAddressComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../src/define/Thing/Person/index.tsx"
import ProductComponent from "../../../../../src/define/Thing/Product/index.tsx"

export type OrderType = "Order"

export interface OrderProps {
	"@type"?: OrderType
	acceptedOffer?: Offer | ReturnType<typeof OfferComponent>
	billingAddress?: PostalAddress | ReturnType<typeof PostalAddressComponent>
	broker?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	confirmationNumber?: Text
	customer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	discount?: Number | Text
	discountCode?: Text
	discountCurrency?: Text
	isGift?: Boolean
	merchant?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	orderDate?: Date | DateTime
	orderDelivery?: ParcelDelivery | ReturnType<typeof ParcelDeliveryComponent>
	orderedItem?:
		| OrderItem
		| Product
		| Service
		| ReturnType<typeof OrderItemComponent>
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
	orderNumber?: Text
	orderStatus?: OrderStatus | ReturnType<typeof OrderStatusComponent>
	partOfInvoice?: Invoice | ReturnType<typeof InvoiceComponent>
	paymentDue?: DateTime
	paymentDueDate?: Date | DateTime
	paymentMethod?:
		| PaymentMethod
		| Text
		| ReturnType<typeof PaymentMethodComponent>
	paymentMethodId?: Text
	paymentUrl?: URL
	seller?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type Order = Thing & IntangibleProps & OrderProps

export default Order
