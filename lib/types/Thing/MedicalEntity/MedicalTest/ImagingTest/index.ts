import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"
import type MedicalImagingTechnique from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.ts"

export interface ImagingTestProps {
	imagingTechnique?: MedicalImagingTechnique
}

type ImagingTest =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& ImagingTestProps

export default ImagingTest
