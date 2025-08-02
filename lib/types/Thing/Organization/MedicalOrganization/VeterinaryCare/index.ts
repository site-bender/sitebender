import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

export type VeterinaryCareType = "VeterinaryCare"

export interface VeterinaryCareProps {
	"@type"?: VeterinaryCareType
}

type VeterinaryCare =
	& Thing
	& OrganizationProps
	& MedicalOrganizationProps
	& VeterinaryCareProps

export default VeterinaryCare
