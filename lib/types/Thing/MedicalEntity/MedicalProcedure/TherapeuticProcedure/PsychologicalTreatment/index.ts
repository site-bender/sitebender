import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalProcedureProps } from "../../index.ts"
import type { TherapeuticProcedureProps } from "../index.ts"

import PsychologicalTreatmentComponent from "../../../../../../../components/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/PsychologicalTreatment/index.tsx"

export interface PsychologicalTreatmentProps {
}

type PsychologicalTreatment =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& PsychologicalTreatmentProps

export default PsychologicalTreatment
