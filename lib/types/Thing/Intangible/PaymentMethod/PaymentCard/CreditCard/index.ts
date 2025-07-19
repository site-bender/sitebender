// CreditCard extends PaymentCard but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../../Service/FinancialProduct/index.ts"
import type { PaymentCardProps } from "../../../Service/FinancialProduct/PaymentCard/index.ts"
import type { ServiceProps } from "../../../Service/index.ts"

// deno-lint-ignore no-empty-interface
export interface CreditCardProps {}

type CreditCard =
	& Thing
	& FinancialProductProps
	& IntangibleProps
	& PaymentCardProps
	& ServiceProps
	& CreditCardProps

export default CreditCard
