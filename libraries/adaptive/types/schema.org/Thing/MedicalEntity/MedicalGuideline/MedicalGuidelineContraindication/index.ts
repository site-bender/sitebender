import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalGuidelineProps } from "../index.ts"

export type MedicalGuidelineContraindicationType =
	"MedicalGuidelineContraindication"

export interface MedicalGuidelineContraindicationProps {
	"@type"?: MedicalGuidelineContraindicationType
}

type MedicalGuidelineContraindication =
	& Thing
	& MedicalEntityProps
	& MedicalGuidelineProps
	& MedicalGuidelineContraindicationProps

export default MedicalGuidelineContraindication
