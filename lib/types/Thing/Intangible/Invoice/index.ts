import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import type PaymentStatusType from "../Enumeration/StatusEnumeration/PaymentStatusType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Order from "../Order/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"

export interface InvoiceProps {
	/** The identifier for the account the payment will be applied to. */
	accountId?: Text
	/** The time interval used to compute the invoice. */
	billingPeriod?: Duration
	/** An entity that arranges for an exchange between a buyer and a seller.  In most cases a broker never acquires or releases ownership of a product or service involved in an exchange.  If it is not clear whether an entity is a broker, seller, or buyer, the latter two terms are preferred. */
	broker?: Organization | Person
	/** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
	category?: Thing | PhysicalActivityCategory | Text | URL | CategoryCode
	/** A number that confirms the given order or payment has been received. */
	confirmationNumber?: Text
	/** Party placing the order or paying the invoice. */
	customer?: Organization | Person
	/** The minimum payment required at this time. */
	minimumPaymentDue?: PriceSpecification | MonetaryAmount
	/** The date that payment is due. */
	paymentDue?: DateTime
	/** The date that payment is due. */
	paymentDueDate?: Date | DateTime
	/** The name of the credit card or other method of payment for the order. */
	paymentMethod?: Text | PaymentMethod
	/** An identifier for the method of payment used (e.g. the last 4 digits of the credit card). */
	paymentMethodId?: Text
	/** The status of payment; whether the invoice has been paid or not. */
	paymentStatus?: PaymentStatusType | Text
	/** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
	provider?: Organization | Person
	/** The Order(s) related to this Invoice. One or more Orders may be combined into a single Invoice. */
	referencesOrder?: Order
	/** The date the invoice is scheduled to be paid. */
	scheduledPaymentDate?: Date
	/** The total amount due. */
	totalPaymentDue?: PriceSpecification | MonetaryAmount
}

type Invoice =
	& Thing
	& IntangibleProps
	& InvoiceProps

export default Invoice
