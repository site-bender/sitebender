import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import GovernmentBenefitsTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/GovernmentBenefitsType/index.tsx"

export interface GovernmentBenefitsTypeProps {
}

type GovernmentBenefitsType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GovernmentBenefitsTypeProps

export default GovernmentBenefitsType
