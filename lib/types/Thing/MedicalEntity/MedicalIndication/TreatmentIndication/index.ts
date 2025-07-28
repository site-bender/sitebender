import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

import TreatmentIndicationComponent from "../../../../../../components/Thing/MedicalEntity/MedicalIndication/TreatmentIndication/index.tsx"

export interface TreatmentIndicationProps {
}

type TreatmentIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& TreatmentIndicationProps

export default TreatmentIndication
