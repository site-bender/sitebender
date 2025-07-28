import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import TierBenefitEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/TierBenefitEnumeration/index.tsx"

export interface TierBenefitEnumerationProps {
}

type TierBenefitEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& TierBenefitEnumerationProps

export default TierBenefitEnumeration
