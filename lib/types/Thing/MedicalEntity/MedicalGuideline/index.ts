import type { Date, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalEntity from "../index.ts"
import type MedicalEvidenceLevel from "../../Intangible/Enumeration/MedicalEnumeration/MedicalEvidenceLevel/index.ts"

export interface MedicalGuidelineProps {
	evidenceLevel?: MedicalEvidenceLevel
	evidenceOrigin?: Text
	guidelineDate?: Date
	guidelineSubject?: MedicalEntity
}

type MedicalGuideline =
	& Thing
	& MedicalEntityProps
	& MedicalGuidelineProps

export default MedicalGuideline
