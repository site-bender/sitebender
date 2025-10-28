import type Thing from "../../../index.ts"
import type MedicalSpecialty from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"
import type MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import type MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../../LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../LocalBusiness/MedicalBusiness/index.ts"
import type { MedicalOrganizationProps } from "../index.ts"
import type { CovidTestingFacilityType } from "./CovidTestingFacility/index.ts"

import MedicalProcedureComponent from "../../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalProcedure/index.tsx"
import MedicalTherapyComponent from "../../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.tsx"
import MedicalTestComponent from "../../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalTest/index.tsx"
import { MedicalSpecialty as MedicalSpecialtyComponent } from "../../../../../../pagewright/index.tsx"

export type MedicalClinicType = "MedicalClinic" | CovidTestingFacilityType

export interface MedicalClinicProps {
	"@type"?: MedicalClinicType
	availableService?:
		| MedicalProcedure
		| MedicalTest
		| MedicalTherapy
		| ReturnType<typeof MedicalProcedureComponent>
		| ReturnType<typeof MedicalTestComponent>
		| ReturnType<typeof MedicalTherapyComponent>
	medicalSpecialty?:
		| MedicalSpecialty
		| ReturnType<typeof MedicalSpecialtyComponent>
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
