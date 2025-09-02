import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { MedicalSpecialtyType } from "./MedicalSpecialty/index.ts"

export type SpecialtyType = "Specialty" | MedicalSpecialtyType

export interface SpecialtyProps {
	"@type"?: SpecialtyType
}

type Specialty = Thing & IntangibleProps & EnumerationProps & SpecialtyProps

export default Specialty
