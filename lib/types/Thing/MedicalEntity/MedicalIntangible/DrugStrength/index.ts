import type { Number, Text } from "../../../../DataType/index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type MaximumDoseSchedule from "../DoseSchedule/MaximumDoseSchedule/index.ts"
import type MedicalIntangible from "../index.ts"

export default interface DrugStrength extends MedicalIntangible {
	/** An active ingredient, typically chemical compounds and/or biologic substances. */
	activeIngredient?: Text
	/** The location in which the strength is available. */
	availableIn?: AdministrativeArea
	/** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
	maximumIntake?: MaximumDoseSchedule
	/** The units of an active ingredient's strength, e.g. mg. */
	strengthUnit?: Text
	/** The value of an active ingredient's strength, e.g. 325. */
	strengthValue?: Number
}
