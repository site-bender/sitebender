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

import OrderStatusComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/OrderStatus/index.ts"
import InvoiceComponent from "../../../../components/Thing/Intangible/Invoice/index.ts"
import OfferComponent from "../../../../components/Thing/Intangible/Offer/index.ts"
import OrderItemComponent from "../../../../components/Thing/Intangible/OrderItem/index.ts"
import ParcelDeliveryComponent from "../../../../components/Thing/Intangible/ParcelDelivery/index.ts"
import PaymentMethodComponent from "../../../../components/Thing/Intangible/PaymentMethod/index.ts"
import ServiceComponent from "../../../../components/Thing/Intangible/Service/index.ts"
import PostalAddressComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"
import ProductComponent from "../../../../components/Thing/Product/index.ts"

export interface OrderProps {
	"@type"?: "Order"
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
