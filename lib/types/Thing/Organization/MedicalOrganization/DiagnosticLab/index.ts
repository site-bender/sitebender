import MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import MedicalOrganization from "../index.ts"

export default interface DiagnosticLab extends MedicalOrganization {
	/** A diagnostic test or procedure offered by this lab. */
	availableTest?: MedicalTest
}
