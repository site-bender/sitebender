import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

export interface TreatmentIndicationProps {
	"@type"?: "TreatmentIndication"}

type TreatmentIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& TreatmentIndicationProps

export default TreatmentIndication
