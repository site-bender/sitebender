import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type Order from "../Order/index.ts"
import type Organization from "../../Organization/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type PaymentStatusType from "../Enumeration/StatusEnumeration/PaymentStatusType/index.ts"
import type Person from "../../Person/index.ts"
import type PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"

import InvoiceComponent from "../../../../../components/Thing/Intangible/Invoice/index.tsx"

export interface InvoiceProps {
	accountId?: Text
	billingPeriod?: Duration
	broker?: Organization | Person
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
	confirmationNumber?: Text
	customer?: Organization | Person
	minimumPaymentDue?: MonetaryAmount | PriceSpecification
	paymentDue?: DateTime
	paymentDueDate?: Date | DateTime
	paymentMethod?: PaymentMethod | Text
	paymentMethodId?: Text
	paymentStatus?: PaymentStatusType | Text
	provider?: Organization | Person
	referencesOrder?: Order
	scheduledPaymentDate?: Date
	totalPaymentDue?: MonetaryAmount | PriceSpecification
}

type Invoice =
	& Thing
	& IntangibleProps
	& InvoiceProps

export default Invoice
