import type Thing from "../../../index.ts"
import type MedicalImagingTechnique from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"

import MedicalImagingTechniqueComponent from "../../../../../../../architect/src/define/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.tsx"

export type ImagingTestType = "ImagingTest"

export interface ImagingTestProps {
	"@type"?: ImagingTestType
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
