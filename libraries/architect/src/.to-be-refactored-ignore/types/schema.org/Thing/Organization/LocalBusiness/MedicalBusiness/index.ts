import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { DentistType } from "./Dentist/index.ts"
import type { MedicalClinicType } from "./MedicalClinic/index.ts"
import type { OpticianType } from "./Optician/index.ts"
import type { PharmacyType } from "./Pharmacy/index.ts"
import type { PhysicianType } from "./Physician/index.ts"

export type MedicalBusinessType =
	| "MedicalBusiness"
	| PharmacyType
	| MedicalClinicType
	| DentistType
	| OpticianType
	| PhysicianType

export interface MedicalBusinessProps {
	"@type"?: MedicalBusinessType
}

type MedicalBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& MedicalBusinessProps

export default MedicalBusiness
