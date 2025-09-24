import type Thing from "../../../index.ts"
import type Drug from "../../../Product/Drug/index.ts"
import type MedicalEntity from "../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type DoseSchedule from "../../MedicalIntangible/DoseSchedule/index.ts"
import type { MedicalProcedureProps } from "../index.ts"
import type { MedicalTherapyType } from "./MedicalTherapy/index.ts"
import type { PsychologicalTreatmentType } from "./PsychologicalTreatment/index.ts"

import MedicalEntityComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/index.tsx"
import DoseScheduleComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/index.tsx"
import { Drug as DrugComponent } from "../../../../../../codewright/index.tsx"

export type TherapeuticProcedureType =
	| "TherapeuticProcedure"
	| PsychologicalTreatmentType
	| MedicalTherapyType

export interface TherapeuticProcedureProps {
	"@type"?: TherapeuticProcedureType
	adverseOutcome?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
	doseSchedule?: DoseSchedule | ReturnType<typeof DoseScheduleComponent>
	drug?: Drug | ReturnType<typeof DrugComponent>
}

type TherapeuticProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps

export default TherapeuticProcedure
