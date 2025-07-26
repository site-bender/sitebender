import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export interface DrugPregnancyCategoryProps {
}

type DrugPregnancyCategory =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& DrugPregnancyCategoryProps

export default DrugPregnancyCategory
