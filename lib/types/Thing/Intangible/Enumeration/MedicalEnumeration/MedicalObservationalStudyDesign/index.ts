import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export interface MedicalObservationalStudyDesignProps {}

type MedicalObservationalStudyDesign =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalObservationalStudyDesignProps

export default MedicalObservationalStudyDesign
