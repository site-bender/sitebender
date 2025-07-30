import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { FinancialProductProps } from "../../Service/FinancialProduct/index.ts"
import type { ServiceProps } from "../../Service/index.ts"
import type { PaymentMethodProps } from "../index.ts"

export interface PaymentServiceProps {
	"@type"?: "PaymentService"}

type PaymentService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& PaymentMethodProps
	& PaymentServiceProps

export default PaymentService
