import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import DrugPregnancyCategoryComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/DrugPregnancyCategory/index.tsx"

export interface DrugPregnancyCategoryProps {
}

type DrugPregnancyCategory =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& DrugPregnancyCategoryProps

export default DrugPregnancyCategory
