import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalStudyStatusComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.tsx"

export interface MedicalStudyStatusProps {
}

type MedicalStudyStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalStudyStatusProps

export default MedicalStudyStatus
