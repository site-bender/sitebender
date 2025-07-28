import type { Date, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalEvidenceLevel from "../../Intangible/Enumeration/MedicalEnumeration/MedicalEvidenceLevel/index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import MedicalEvidenceLevelComponent from "../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalEvidenceLevel/index.ts"
import MedicalEntityComponent from "../../../../components/Thing/MedicalEntity/index.ts"

export interface MedicalGuidelineProps {
	evidenceLevel?:
		| MedicalEvidenceLevel
		| ReturnType<typeof MedicalEvidenceLevelComponent>
	evidenceOrigin?: Text
	guidelineDate?: Date
	guidelineSubject?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
}

type MedicalGuideline = Thing & MedicalEntityProps & MedicalGuidelineProps

export default MedicalGuideline
