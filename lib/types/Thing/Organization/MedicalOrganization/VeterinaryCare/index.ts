import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

import VeterinaryCareComponent from "../../../../../../components/Thing/Organization/MedicalOrganization/VeterinaryCare/index.tsx"

export interface VeterinaryCareProps {
}

type VeterinaryCare =
	& Thing
	& OrganizationProps
	& MedicalOrganizationProps
	& VeterinaryCareProps

export default VeterinaryCare
