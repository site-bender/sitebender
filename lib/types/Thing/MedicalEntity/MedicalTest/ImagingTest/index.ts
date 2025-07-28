import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"
import type MedicalImagingTechnique from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.ts"

import ImagingTestComponent from "../../../../../../components/Thing/MedicalEntity/MedicalTest/ImagingTest/index.tsx"

export interface ImagingTestProps {
	imagingTechnique?: MedicalImagingTechnique
}

type ImagingTest =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& ImagingTestProps

export default ImagingTest
