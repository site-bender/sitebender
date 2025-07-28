import type Thing from "../../../index.ts"
import type Drug from "../../../Product/Drug/index.ts"
import type MedicalEntity from "../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type DoseSchedule from "../../MedicalIntangible/DoseSchedule/index.ts"
import type { MedicalProcedureProps } from "../index.ts"

import MedicalEntityComponent from "../../../../../components/Thing/MedicalEntity/index.ts"
import DoseScheduleComponent from "../../../../../components/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/index.ts"
import DrugComponent from "../../../../../components/Thing/Product/Drug/index.ts"

export interface TherapeuticProcedureProps {
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
