import {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import Product from "../../Product/index.ts"
import OrderStatus from "../Enumeration/StatusEnumeration/OrderStatus/index.ts"
import Intangible from "../index.ts"
import Invoice from "../Invoice/index.ts"
import Offer from "../Offer/index.ts"
import OrderItem from "../OrderItem/index.ts"
import ParcelDelivery from "../ParcelDelivery/index.ts"
import PaymentMethod from "../PaymentMethod/index.ts"
import Service from "../Service/index.ts"
import PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"

export default interface Order extends Intangible {
	/** The offer(s) -- e.g., product, quantity and price combinations -- included in the order. */
	acceptedOffer?: Offer
	/** The billing address for the order. */
	billingAddress?: PostalAddress
	/** An entity that arranges for an exchange between a buyer and a seller.  In most cases a broker never acquires or releases ownership of a product or service involved in an exchange.  If it is not clear whether an entity is a broker, seller, or buyer, the latter two terms are preferred. */
	broker?: Organization | Person
	/** A number that confirms the given order or payment has been received. */
	confirmationNumber?: Text
	/** Party placing the order or paying the invoice. */
	customer?: Organization | Person
	/** Any discount applied (to an Order). */
	discount?: Text | Number
	/** Code used to redeem a discount. */
	discountCode?: Text
	/** The currency of the discount.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217), e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies, e.g. "BTC"; well known names for [Local Exchange Trading Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types, e.g. "Ithaca HOUR". */
	discountCurrency?: Text
	/** Indicates whether the offer was accepted as a gift for someone other than the buyer. */
	isGift?: Boolean
	/** 'merchant' is an out-dated term for 'seller'. */
	merchant?: Organization | Person
	/** Date order was placed. */
	orderDate?: DateTime | Date
	/** The delivery of the parcel related to this order or order item. */
	orderDelivery?: ParcelDelivery
	/** The identifier of the transaction. */
	orderNumber?: Text
	/** The current status of the order. */
	orderStatus?: OrderStatus
	/** The item ordered. */
	orderedItem?: Service | OrderItem | Product
	/** The order is being paid as part of the referenced Invoice. */
	partOfInvoice?: Invoice
	/** The date that payment is due. */
	paymentDue?: DateTime
	/** The date that payment is due. */
	paymentDueDate?: Date | DateTime
	/** The name of the credit card or other method of payment for the order. */
	paymentMethod?: Text | PaymentMethod
	/** An identifier for the method of payment used (e.g. the last 4 digits of the credit card). */
	paymentMethodId?: Text
	/** The URL for sending a payment. */
	paymentUrl?: URL
	/** An entity which offers (sells / leases / lends / loans) the services / goods.  A seller may also be a provider. */
	seller?: Organization | Person
}
