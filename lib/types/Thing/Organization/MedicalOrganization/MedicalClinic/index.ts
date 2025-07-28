import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../../LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../LocalBusiness/MedicalBusiness/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { MedicalOrganizationProps } from "../index.ts"
import type MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import type MedicalSpecialty from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

import MedicalClinicComponent from "../../../../../../components/Thing/Organization/MedicalOrganization/MedicalClinic/index.tsx"

export interface MedicalClinicProps {
	availableService?: MedicalProcedure | MedicalTest | MedicalTherapy
	medicalSpecialty?: MedicalSpecialty
}

type MedicalClinic =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& MedicalBusinessProps
	& PlaceProps
	& MedicalOrganizationProps
	& MedicalClinicProps

export default MedicalClinic
