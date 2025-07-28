import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import OfferItemConditionComponent from "../../../../../../components/Thing/Intangible/Enumeration/OfferItemCondition/index.tsx"

export interface OfferItemConditionProps {
}

type OfferItemCondition =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& OfferItemConditionProps

export default OfferItemCondition
