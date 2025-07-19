// VeterinaryCare extends MedicalOrganization but adds no additional properties
import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface VeterinaryCareProps {}

type VeterinaryCare =
	& Thing
	& MedicalOrganizationProps
	& OrganizationProps
	& VeterinaryCareProps

export default VeterinaryCare
