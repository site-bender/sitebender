import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { SpecialtyProps } from "../../Specialty/index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export interface MedicalSpecialtyProps {}

type MedicalSpecialty =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SpecialtyProps
	& MedicalEnumerationProps
	& MedicalSpecialtyProps

export default MedicalSpecialty
