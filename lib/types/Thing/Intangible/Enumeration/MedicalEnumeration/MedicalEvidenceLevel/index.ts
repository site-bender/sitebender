import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalEvidenceLevelComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalEvidenceLevel/index.tsx"

export interface MedicalEvidenceLevelProps {
}

type MedicalEvidenceLevel =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalEvidenceLevelProps

export default MedicalEvidenceLevel
