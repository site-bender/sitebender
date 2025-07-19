// PsychologicalTreatment extends TherapeuticProcedure but adds no additional properties
import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalProcedureProps } from "../../index.ts"
import type { TherapeuticProcedureProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PsychologicalTreatmentProps {}

type PsychologicalTreatment =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& PsychologicalTreatmentProps

export default PsychologicalTreatment
