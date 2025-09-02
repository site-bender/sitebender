import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type GovernmentBenefitsTypeType = "GovernmentBenefitsType"

export interface GovernmentBenefitsTypeProps {
	"@type"?: GovernmentBenefitsTypeType
}

type GovernmentBenefitsType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GovernmentBenefitsTypeProps

export default GovernmentBenefitsType
