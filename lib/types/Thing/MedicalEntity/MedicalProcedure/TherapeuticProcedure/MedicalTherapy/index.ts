import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type MedicalEntity from "../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type MedicalContraindication from "../../../MedicalContraindication/index.ts"
import type { MedicalProcedureProps } from "../../index.ts"
import type { TherapeuticProcedureProps } from "../index.ts"

export interface MedicalTherapyProps {
	/** A contraindication for this therapy. */
	contraindication?: Text | MedicalContraindication
	/** A therapy that duplicates or overlaps this one. */
	duplicateTherapy?: MedicalTherapy
	/** A possible serious complication and/or serious side effect of this therapy. Serious adverse outcomes include those that are life-threatening; result in death, disability, or permanent damage; require hospitalization or prolong existing hospitalization; cause congenital anomalies or birth defects; or jeopardize the patient and may require medical or surgical intervention to prevent one of the outcomes in this definition. */
	seriousAdverseOutcome?: MedicalEntity
}

type MedicalTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps

export default MedicalTherapy
