import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../../Service/index.ts"
import type { FinancialProductProps } from "../../Service/FinancialProduct/index.ts"
import type { PaymentMethodProps } from "../index.ts"

import PaymentServiceComponent from "../../../../../../components/Thing/Intangible/PaymentMethod/PaymentService/index.tsx"

export interface PaymentServiceProps {
}

type PaymentService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& PaymentMethodProps
	& PaymentServiceProps

export default PaymentService
