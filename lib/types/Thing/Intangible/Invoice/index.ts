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

import ThingComponent from "../../../../components/Thing/index.ts"
import CategoryCodeComponent from "../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"
import PhysicalActivityCategoryComponent from "../../../../components/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import PaymentStatusTypeComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/PaymentStatusType/index.ts"
import OrderComponent from "../../../../components/Thing/Intangible/Order/index.ts"
import PaymentMethodComponent from "../../../../components/Thing/Intangible/PaymentMethod/index.ts"
import DurationComponent from "../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import MonetaryAmountComponent from "../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import PriceSpecificationComponent from "../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface InvoiceProps {
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
