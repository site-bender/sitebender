import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type MedicalSpecialty from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import type MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../../LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../LocalBusiness/MedicalBusiness/index.ts"
import type Hospital from "../Hospital/index.ts"
import type { MedicalOrganizationProps } from "../index.ts"
import type { IndividualPhysicianType } from "./IndividualPhysician/index.ts"
import type { PhysiciansOfficeType } from "./PhysiciansOffice/index.ts"

import CategoryCodeComponent from "../../../../../../../codewright/src/define/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"
import MedicalProcedureComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalProcedure/index.tsx"
import MedicalTherapyComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.tsx"
import MedicalTestComponent from "../../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalTest/index.tsx"
import { Hospital as HospitalComponent } from "../../../../../../codewright/index.tsx"
import { MedicalSpecialty as MedicalSpecialtyComponent } from "../../../../../../codewright/index.tsx"

export type PhysicianType =
	| "Physician"
	| IndividualPhysicianType
	| PhysiciansOfficeType

export interface PhysicianProps {
	"@type"?: PhysicianType
	availableService?:
		| MedicalProcedure
		| MedicalTest
		| MedicalTherapy
		| ReturnType<typeof MedicalProcedureComponent>
		| ReturnType<typeof MedicalTestComponent>
		| ReturnType<typeof MedicalTherapyComponent>
	hospitalAffiliation?: Hospital | ReturnType<typeof HospitalComponent>
	medicalSpecialty?:
		| MedicalSpecialty
		| ReturnType<typeof MedicalSpecialtyComponent>
	occupationalCategory?:
		| CategoryCode
		| Text
		| ReturnType<typeof CategoryCodeComponent>
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
