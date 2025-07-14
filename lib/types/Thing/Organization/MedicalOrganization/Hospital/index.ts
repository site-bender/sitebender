import Dataset from "../../../CreativeWork/Dataset/index.ts"
import MedicalSpecialty from "../../../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import CDCPMDRecord from "../../../Intangible/StructuredValue/CDCPMDRecord/index.ts"
import MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import MedicalOrganization from "../index.ts"

export default interface Hospital extends MedicalOrganization {
	/** A medical service available from this provider. */
	availableService?: MedicalProcedure | MedicalTest | MedicalTherapy
	/** Indicates data describing a hospital, e.g. a CDC [[CDCPMDRecord]] or as some kind of [[Dataset]]. */
	healthcareReportingData?: CDCPMDRecord | Dataset
	/** A medical specialty of the provider. */
	medicalSpecialty?: MedicalSpecialty
}
