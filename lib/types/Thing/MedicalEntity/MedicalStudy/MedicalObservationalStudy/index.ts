import type Thing from "../../../index.ts"
import type MedicalObservationalStudyDesign from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalObservationalStudyDesign/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalStudyProps } from "../index.ts"

import MedicalObservationalStudyDesignComponent from "../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalObservationalStudyDesign/index.ts"

export interface MedicalObservationalStudyProps {
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
