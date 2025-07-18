import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type MedicalEntityProps from "../index.ts"
import type MaximumDoseSchedule from "../MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"

export interface SubstanceProps {
	/** An active ingredient, typically chemical compounds and/or biologic substances. */
	activeIngredient?: Text
	/** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
	maximumIntake?: MaximumDoseSchedule
}

type Substance = Thing & MedicalEntityProps & SubstanceProps

export default Substance
