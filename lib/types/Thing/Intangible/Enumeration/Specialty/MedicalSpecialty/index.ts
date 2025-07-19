// MedicalSpecialty extends Specialty but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { SpecialtyProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MedicalSpecialtyProps {}

type MedicalSpecialty =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& SpecialtyProps
	& MedicalSpecialtyProps

export default MedicalSpecialty
