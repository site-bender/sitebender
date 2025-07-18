import type Dataset from "../../../CreativeWork/Dataset/index.ts"
import type Thing from "../../../index.ts"
import type MedicalSpecialty from "../../../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import type CDCPMDRecord from "../../../Intangible/StructuredValue/CDCPMDRecord/index.ts"
import type MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import type MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type CivicStructure from "../../../Place/CivicStructure/index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type EmergencyService from "../../../Place/LocalBusiness/EmergencyService/index.ts"
import type { EmergencyServiceProps } from "../../LocalBusiness/EmergencyService/index.ts"
import type MedicalOrganization from "../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

export interface HospitalProps {
	/** A medical service available from this provider. */
	availableService?: MedicalProcedure | MedicalTest | MedicalTherapy
	/** Indicates data describing a hospital, e.g. a CDC [[CDCPMDRecord]] or as some kind of [[Dataset]]. */
	healthcareReportingData?: CDCPMDRecord | Dataset
	/** A medical specialty of the provider. */
	medicalSpecialty?: MedicalSpecialty
}

type Hospital =
	& Thing
	& MedicalOrganizationProps
	& EmergencyServiceProps
	& CivicStructureProps
	& HospitalProps

export default Hospital
