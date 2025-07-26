import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../../LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../LocalBusiness/MedicalBusiness/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { MedicalOrganizationProps } from "../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type Hospital from "../Hospital/index.ts"
import type MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import type MedicalSpecialty from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export interface PhysicianProps {
	availableService?: MedicalProcedure | MedicalTest | MedicalTherapy
	hospitalAffiliation?: Hospital
	medicalSpecialty?: MedicalSpecialty
	occupationalCategory?: CategoryCode | Text
	usNPI?: Text
}

type Physician =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& MedicalBusinessProps
	& PlaceProps
	& MedicalOrganizationProps
	& PhysicianProps

export default Physician
