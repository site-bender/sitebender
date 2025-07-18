import type Thing from "../../../index.ts"
import type MedicalBusiness from "../../../Place/LocalBusiness/MedicalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../LocalBusiness/MedicalBusiness/index.ts"
import type MedicalOrganization from "../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

// Pharmacy extends MedicalOrganization but adds no additional properties

export interface PharmacyProps {
}

type Pharmacy =
	& Thing
	& MedicalOrganizationProps
	& MedicalBusinessProps
	& PharmacyProps

export default Pharmacy
