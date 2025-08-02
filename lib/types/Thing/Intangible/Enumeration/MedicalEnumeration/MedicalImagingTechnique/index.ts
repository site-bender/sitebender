import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicalImagingTechniqueType = "MedicalImagingTechnique"

export interface MedicalImagingTechniqueProps {
	"@type"?: MedicalImagingTechniqueType
}

type MedicalImagingTechnique =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalImagingTechniqueProps

export default MedicalImagingTechnique
