import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalStudyProps } from "../index.ts"
import type MedicalObservationalStudyDesign from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalObservationalStudyDesign/index.ts"

export interface MedicalObservationalStudyProps {
	studyDesign?: MedicalObservationalStudyDesign
}

type MedicalObservationalStudy =
	& Thing
	& MedicalEntityProps
	& MedicalStudyProps
	& MedicalObservationalStudyProps

export default MedicalObservationalStudy
