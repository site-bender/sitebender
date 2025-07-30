import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface GovernmentBenefitsTypeProps {
	"@type"?: "GovernmentBenefitsType"}

type GovernmentBenefitsType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GovernmentBenefitsTypeProps

export default GovernmentBenefitsType
