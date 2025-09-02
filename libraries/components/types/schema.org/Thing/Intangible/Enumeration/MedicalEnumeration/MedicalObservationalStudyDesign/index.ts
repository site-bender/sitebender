import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicalObservationalStudyDesignType =
	"MedicalObservationalStudyDesign"

export interface MedicalObservationalStudyDesignProps {
	"@type"?: MedicalObservationalStudyDesignType
}

type MedicalObservationalStudyDesign =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalObservationalStudyDesignProps

export default MedicalObservationalStudyDesign
