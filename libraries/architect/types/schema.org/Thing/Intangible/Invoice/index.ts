import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
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

import ThingComponent from "../../../../../../pagewright/src/define/Thing/index.tsx"
import CategoryCodeComponent from "../../../../../../pagewright/src/define/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"
import PhysicalActivityCategoryComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.tsx"
import PaymentStatusTypeComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/StatusEnumeration/PaymentStatusType/index.tsx"
import OrderComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Order/index.tsx"
import PaymentMethodComponent from "../../../../../../pagewright/src/define/Thing/Intangible/PaymentMethod/index.tsx"
import DurationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import MonetaryAmountComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import PriceSpecificationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/PriceSpecification/index.tsx"
import OrganizationComponent from "../../../../../../pagewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../pagewright/src/define/Thing/Person/index.tsx"

export type InvoiceType = "Invoice"

export interface InvoiceProps {
	"@type"?: InvoiceType
	accountId?: Text
	billingPeriod?: Duration | ReturnType<typeof DurationComponent>
	broker?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
	confirmationNumber?: Text
	customer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	minimumPaymentDue?:
		| MonetaryAmount
		| PriceSpecification
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof PriceSpecificationComponent>
	paymentDue?: DateTime
	paymentDueDate?: Date | DateTime
	paymentMethod?:
		| PaymentMethod
		| Text
		| ReturnType<typeof PaymentMethodComponent>
	paymentMethodId?: Text
	paymentStatus?:
		| PaymentStatusType
		| Text
		| ReturnType<typeof PaymentStatusTypeComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	referencesOrder?: Order | ReturnType<typeof OrderComponent>
	scheduledPaymentDate?: Date
	totalPaymentDue?:
		| MonetaryAmount
		| PriceSpecification
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof PriceSpecificationComponent>
}

type Invoice = Thing & IntangibleProps & InvoiceProps

export default Invoice
