import MedicalSpecialty from "../../../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import MedicalOrganization from "../index.ts"

export default interface MedicalClinic extends MedicalOrganization {
	/** A medical service available from this provider. */
	availableService?: MedicalProcedure | MedicalTest | MedicalTherapy
	/** A medical specialty of the provider. */
	medicalSpecialty?: MedicalSpecialty
}
