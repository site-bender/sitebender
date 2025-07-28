import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import DeliveryMethodComponent from "../../../../../../components/Thing/Intangible/Enumeration/DeliveryMethod/index.tsx"

export interface DeliveryMethodProps {
}

type DeliveryMethod =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& DeliveryMethodProps

export default DeliveryMethod
