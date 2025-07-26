import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

export interface VeterinaryCareProps {
}

type VeterinaryCare =
	& Thing
	& OrganizationProps
	& MedicalOrganizationProps
	& VeterinaryCareProps

export default VeterinaryCare
