import type { Boolean, Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../../Service/index.ts"
import type { FinancialProductProps } from "../../Service/FinancialProduct/index.ts"
import type { PaymentMethodProps } from "../index.ts"
import type MonetaryAmount from "../../StructuredValue/MonetaryAmount/index.ts"

export interface PaymentCardProps {
	cashBack?: Boolean | Number
	contactlessPayment?: Boolean
	floorLimit?: MonetaryAmount
	monthlyMinimumRepaymentAmount?: MonetaryAmount | Number
}

type PaymentCard =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& PaymentMethodProps
	& PaymentCardProps

export default PaymentCard
