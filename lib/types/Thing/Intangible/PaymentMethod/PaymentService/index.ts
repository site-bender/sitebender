import type Thing from "../../../index.ts"
import type FinancialProduct from "../../Service/FinancialProduct/index.ts"
import type { FinancialProductProps } from "../../Service/FinancialProduct/index.ts"
import type PaymentMethod from "../index.ts"
import type { PaymentMethodProps } from "../index.ts"

// PaymentService extends PaymentMethod but adds no additional properties

export interface PaymentServiceProps {
}

type PaymentService =
	& Thing
	& PaymentMethodProps
	& FinancialProductProps
	& PaymentServiceProps

export default PaymentService
