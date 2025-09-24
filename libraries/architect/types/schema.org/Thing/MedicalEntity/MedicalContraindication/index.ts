import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

export type MedicalContraindicationType = "MedicalContraindication"

export interface MedicalContraindicationProps {
	"@type"?: MedicalContraindicationType
}

type MedicalContraindication =
	& Thing
	& MedicalEntityProps
	& MedicalContraindicationProps

export default MedicalContraindication
