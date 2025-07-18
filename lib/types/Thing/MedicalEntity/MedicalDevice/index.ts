import type { Text } from "../../../DataType/index.ts"
import type MedicalEntity from "../index.ts"
import type MedicalContraindication from "../MedicalContraindication/index.ts"

export default interface MedicalDevice extends MedicalEntity {
	/** A possible complication and/or side effect of this therapy. If it is known that an adverse outcome is serious (resulting in death, disability, or permanent damage; requiring hospitalization; or otherwise life-threatening or requiring immediate medical attention), tag it as a seriousAdverseOutcome instead. */
	adverseOutcome?: MedicalEntity
	/** A contraindication for this therapy. */
	contraindication?: Text | MedicalContraindication
	/** A description of the postoperative procedures, care, and/or followups for this device. */
	postOp?: Text
	/** A description of the workup, testing, and other preparations required before implanting this device. */
	preOp?: Text
	/** A description of the procedure involved in setting up, using, and/or installing the device. */
	procedure?: Text
	/** A possible serious complication and/or serious side effect of this therapy. Serious adverse outcomes include those that are life-threatening; result in death, disability, or permanent damage; require hospitalization or prolong existing hospitalization; cause congenital anomalies or birth defects; or jeopardize the patient and may require medical or surgical intervention to prevent one of the outcomes in this definition. */
	seriousAdverseOutcome?: MedicalEntity
}
