import type Thing from "../../../index.ts"
import type MedicalObservationalStudyDesign from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalObservationalStudyDesign/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalStudyProps } from "../index.ts"

import { MedicalObservationalStudyDesign as MedicalObservationalStudyDesignComponent } from "../../../../../../components/index.tsx"

export type MedicalObservationalStudyType = "MedicalObservationalStudy"

export interface MedicalObservationalStudyProps {
	"@type"?: MedicalObservationalStudyType
	studyDesign?:
		| MedicalObservationalStudyDesign
		| ReturnType<typeof MedicalObservationalStudyDesignComponent>
}

type MedicalObservationalStudy =
	& Thing
	& MedicalEntityProps
	& MedicalStudyProps
	& MedicalObservationalStudyProps

export default MedicalObservationalStudy
