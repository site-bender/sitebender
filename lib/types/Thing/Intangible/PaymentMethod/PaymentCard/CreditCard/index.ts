import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../../Service/index.ts"
import type { FinancialProductProps } from "../../../Service/FinancialProduct/index.ts"
import type { LoanOrCreditProps } from "../../../Service/FinancialProduct/LoanOrCredit/index.ts"
import type { PaymentCardProps } from "../index.ts"
import type { PaymentMethodProps } from "../../index.ts"

export interface CreditCardProps {
}

type CreditCard =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& LoanOrCreditProps
	& PaymentCardProps
	& PaymentMethodProps
	& CreditCardProps

export default CreditCard
