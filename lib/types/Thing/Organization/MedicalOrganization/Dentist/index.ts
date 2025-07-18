import type Thing from "../../../index.ts"
import type LocalBusiness from "../../../Place/LocalBusiness/index.ts"
import type MedicalBusiness from "../../../Place/LocalBusiness/MedicalBusiness/index.ts"
import type { LocalBusinessProps } from "../../LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../LocalBusiness/MedicalBusiness/index.ts"
import type MedicalOrganization from "../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

// Dentist extends MedicalOrganization but adds no additional properties

export interface DentistProps {
}

type Dentist =
	& Thing
	& MedicalOrganizationProps
	& MedicalBusinessProps
	& LocalBusinessProps
	& DentistProps

export default Dentist
