import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"
import type DoseSchedule from "../../MedicalIntangible/DoseSchedule/index.ts"
import type Drug from "../../../Product/Drug/index.ts"
import type MedicalEntity from "../../index.ts"

export interface TherapeuticProcedureProps {
	adverseOutcome?: MedicalEntity
	doseSchedule?: DoseSchedule
	drug?: Drug
}

type TherapeuticProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps

export default TherapeuticProcedure
