import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalImagingTechniqueComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.tsx"

export interface MedicalImagingTechniqueProps {
}

type MedicalImagingTechnique =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalImagingTechniqueProps

export default MedicalImagingTechnique
