import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import MedicalContraindicationComponent from "../../../../../components/Thing/MedicalEntity/MedicalContraindication/index.tsx"

export interface MedicalContraindicationProps {
}

type MedicalContraindication =
	& Thing
	& MedicalEntityProps
	& MedicalContraindicationProps

export default MedicalContraindication
