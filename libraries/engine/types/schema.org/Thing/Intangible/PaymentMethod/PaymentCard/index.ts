import type { Boolean, Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { FinancialProductProps } from "../../Service/FinancialProduct/index.ts"
import type { ServiceProps } from "../../Service/index.ts"
import type MonetaryAmount from "../../StructuredValue/MonetaryAmount/index.ts"
import type { PaymentMethodProps } from "../index.ts"
import type { CreditCardType } from "./CreditCard/index.ts"

import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../../components/index.tsx"

export type PaymentCardType = "PaymentCard" | CreditCardType

export interface PaymentCardProps {
	"@type"?: PaymentCardType
	cashBack?: Boolean | Number
	contactlessPayment?: Boolean
	floorLimit?: MonetaryAmount | ReturnType<typeof MonetaryAmountComponent>
	monthlyMinimumRepaymentAmount?:
		| MonetaryAmount
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
}

type PaymentCard =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& PaymentMethodProps
	& PaymentCardProps

export default PaymentCard
