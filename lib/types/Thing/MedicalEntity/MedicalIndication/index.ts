import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import MedicalIndicationComponent from "../../../../../components/Thing/MedicalEntity/MedicalIndication/index.tsx"

export interface MedicalIndicationProps {
}

type MedicalIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps

export default MedicalIndication
