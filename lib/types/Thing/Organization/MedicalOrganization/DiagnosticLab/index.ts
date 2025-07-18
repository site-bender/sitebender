import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type MedicalOrganization from "../index.ts"

export default interface DiagnosticLab extends MedicalOrganization {
	/** A diagnostic test or procedure offered by this lab. */
	availableTest?: MedicalTest
}
