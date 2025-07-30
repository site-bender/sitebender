import type Thing from "../../../index.ts"
import type MedicalImagingTechnique from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"

import MedicalImagingTechniqueComponent from "../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.ts"

export interface ImagingTestProps {
	"@type"?: "ImagingTest"
	imagingTechnique?:
		| MedicalImagingTechnique
		| ReturnType<typeof MedicalImagingTechniqueComponent>
}

type ImagingTest =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& ImagingTestProps

export default ImagingTest
