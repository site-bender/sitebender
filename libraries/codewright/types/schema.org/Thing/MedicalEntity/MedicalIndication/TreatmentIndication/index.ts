import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

export type TreatmentIndicationType = "TreatmentIndication"

export interface TreatmentIndicationProps {
	"@type"?: TreatmentIndicationType
}

type TreatmentIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& TreatmentIndicationProps

export default TreatmentIndication
