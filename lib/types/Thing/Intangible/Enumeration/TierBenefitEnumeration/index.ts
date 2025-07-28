import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface TierBenefitEnumerationProps {}

type TierBenefitEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& TierBenefitEnumerationProps

export default TierBenefitEnumeration
