import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalProcedureProps } from "../../index.ts"
import type { TherapeuticProcedureProps } from "../index.ts"

export type PsychologicalTreatmentType = "PsychologicalTreatment"

export interface PsychologicalTreatmentProps {
	"@type"?: PsychologicalTreatmentType
}

type PsychologicalTreatment =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& PsychologicalTreatmentProps

export default PsychologicalTreatment
