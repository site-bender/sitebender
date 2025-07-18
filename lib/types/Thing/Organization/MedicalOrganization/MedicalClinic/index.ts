import type Thing from "../../../index.ts"
import type MedicalSpecialty from "../../../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import type MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import type MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type MedicalBusiness from "../../../Place/LocalBusiness/MedicalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../LocalBusiness/MedicalBusiness/index.ts"
import type MedicalOrganization from "../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

export interface MedicalClinicProps {
	/** A medical service available from this provider. */
	availableService?: MedicalProcedure | MedicalTest | MedicalTherapy
	/** A medical specialty of the provider. */
	medicalSpecialty?: MedicalSpecialty
}

type MedicalClinic =
	& Thing
	& MedicalOrganizationProps
	& MedicalBusinessProps
	& MedicalClinicProps

export default MedicalClinic
