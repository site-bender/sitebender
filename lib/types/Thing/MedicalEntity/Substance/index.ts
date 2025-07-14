import { Text } from "../../../DataType/index.ts"
import MedicalEntity from "../index.ts"
import MaximumDoseSchedule from "../MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"

export default interface Substance extends MedicalEntity {
	/** An active ingredient, typically chemical compounds and/or biologic substances. */
	activeIngredient?: Text
	/** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
	maximumIntake?: MaximumDoseSchedule
}
