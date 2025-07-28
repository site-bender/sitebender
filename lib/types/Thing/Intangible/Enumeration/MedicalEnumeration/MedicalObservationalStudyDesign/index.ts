import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalObservationalStudyDesignComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalObservationalStudyDesign/index.tsx"

export interface MedicalObservationalStudyDesignProps {
}

type MedicalObservationalStudyDesign =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalObservationalStudyDesignProps

export default MedicalObservationalStudyDesign
