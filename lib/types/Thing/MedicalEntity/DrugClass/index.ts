import type Drug from "../../Product/Drug/index.ts"
import type MedicalEntity from "../index.ts"

export default interface DrugClass extends MedicalEntity {
	/** Specifying a drug or medicine used in a medication procedure. */
	drug?: Drug
}
