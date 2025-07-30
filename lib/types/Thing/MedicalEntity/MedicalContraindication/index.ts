import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface MedicalContraindicationProps {
	"@type"?: "MedicalContraindication"}

type MedicalContraindication =
	& Thing
	& MedicalEntityProps
	& MedicalContraindicationProps

export default MedicalContraindication
