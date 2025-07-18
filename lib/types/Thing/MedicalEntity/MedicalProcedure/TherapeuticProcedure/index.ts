import type Drug from "../../../Product/Drug/index.ts"
import type MedicalEntity from "../../index.ts"
import type DoseSchedule from "../../MedicalIntangible/DoseSchedule/index.ts"
import type MedicalProcedure from "../index.ts"

export default interface TherapeuticProcedure extends MedicalProcedure {
	/** A possible complication and/or side effect of this therapy. If it is known that an adverse outcome is serious (resulting in death, disability, or permanent damage; requiring hospitalization; or otherwise life-threatening or requiring immediate medical attention), tag it as a seriousAdverseOutcome instead. */
	adverseOutcome?: MedicalEntity
	/** A dosing schedule for the drug for a given population, either observed, recommended, or maximum dose based on the type used. */
	doseSchedule?: DoseSchedule
	/** Specifying a drug or medicine used in a medication procedure. */
	drug?: Drug
}
