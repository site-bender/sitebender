import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalGuidelineProps } from "../index.ts"

export interface MedicalGuidelineContraindicationProps {
}

type MedicalGuidelineContraindication =
	& Thing
	& MedicalEntityProps
	& MedicalGuidelineProps
	& MedicalGuidelineContraindicationProps

export default MedicalGuidelineContraindication
