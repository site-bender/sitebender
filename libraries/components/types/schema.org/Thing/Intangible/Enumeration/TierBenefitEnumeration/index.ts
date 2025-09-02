import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type TierBenefitEnumerationType = "TierBenefitEnumeration"

export interface TierBenefitEnumerationProps {
	"@type"?: TierBenefitEnumerationType
}

type TierBenefitEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& TierBenefitEnumerationProps

export default TierBenefitEnumeration
