import type Thing from "../../../../index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../../LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../../LocalBusiness/MedicalBusiness/index.ts"
import type { PhysicianProps } from "../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { MedicalOrganizationProps } from "../../index.ts"

import PhysiciansOfficeComponent from "../../../../../../../components/Thing/Organization/MedicalOrganization/Physician/PhysiciansOffice/index.tsx"

export interface PhysiciansOfficeProps {
}

type PhysiciansOffice =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& MedicalBusinessProps
	& PhysicianProps
	& PlaceProps
	& MedicalOrganizationProps
	& PhysiciansOfficeProps

export default PhysiciansOffice
