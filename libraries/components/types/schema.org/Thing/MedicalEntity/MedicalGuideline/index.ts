import type { Date, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalEvidenceLevel from "../../Intangible/Enumeration/MedicalEnumeration/MedicalEvidenceLevel/index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type { MedicalGuidelineContraindicationType } from "./MedicalGuidelineContraindication/index.ts"
import type { MedicalGuidelineRecommendationType } from "./MedicalGuidelineRecommendation/index.ts"

import { MedicalEntity as MedicalEntityComponent } from "../../../../../components/index.tsx"
import { MedicalEvidenceLevel as MedicalEvidenceLevelComponent } from "../../../../../components/index.tsx"

export type MedicalGuidelineType =
	| "MedicalGuideline"
	| MedicalGuidelineRecommendationType
	| MedicalGuidelineContraindicationType

export interface MedicalGuidelineProps {
	"@type"?: MedicalGuidelineType
	evidenceLevel?:
		| MedicalEvidenceLevel
		| ReturnType<typeof MedicalEvidenceLevelComponent>
	evidenceOrigin?: Text
	guidelineDate?: Date
	guidelineSubject?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
}

type MedicalGuideline = Thing & MedicalEntityProps & MedicalGuidelineProps

export default MedicalGuideline
