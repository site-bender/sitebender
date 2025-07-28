import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalAudienceTypeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalAudienceType/index.tsx"

export interface MedicalAudienceTypeProps {
}

type MedicalAudienceType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalAudienceTypeProps

export default MedicalAudienceType
