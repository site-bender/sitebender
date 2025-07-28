import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { SpecialtyProps } from "../../Specialty/index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalSpecialtyComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.tsx"

export interface MedicalSpecialtyProps {
}

type MedicalSpecialty =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SpecialtyProps
	& MedicalEnumerationProps
	& MedicalSpecialtyProps

export default MedicalSpecialty
