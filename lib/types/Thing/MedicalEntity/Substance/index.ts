import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MaximumDoseSchedule from "../MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"
import type { DietarySupplementType } from "./DietarySupplement/index.ts"
import type { DrugType } from "./Drug/index.ts"

import MaximumDoseScheduleComponent from "../../../../components/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"

export type SubstanceType = "Substance" | DietarySupplementType | DrugType

export interface SubstanceProps {
	"@type"?: SubstanceType
	activeIngredient?: Text
	maximumIntake?:
		| MaximumDoseSchedule
		| ReturnType<typeof MaximumDoseScheduleComponent>
}

type Substance = Thing & MedicalEntityProps & SubstanceProps

export default Substance
