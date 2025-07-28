import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import PaymentMethodTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/PaymentMethodType/index.tsx"

export interface PaymentMethodTypeProps {
}

type PaymentMethodType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PaymentMethodTypeProps

export default PaymentMethodType
