import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalProcedureProps } from "../../index.ts"
import type { TherapeuticProcedureProps } from "../index.ts"

export interface PsychologicalTreatmentProps {
	"@type"?: "PsychologicalTreatment"}

type PsychologicalTreatment =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& PsychologicalTreatmentProps

export default PsychologicalTreatment
