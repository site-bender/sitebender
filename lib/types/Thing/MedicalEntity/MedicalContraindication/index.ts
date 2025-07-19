// MedicalContraindication extends MedicalEntity but adds no additional properties
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MedicalContraindicationProps {}

type MedicalContraindication =
	& Thing
	& MedicalEntityProps
	& MedicalContraindicationProps

export default MedicalContraindication
