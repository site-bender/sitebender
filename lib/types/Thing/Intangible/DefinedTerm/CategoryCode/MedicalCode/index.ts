import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { DefinedTermProps } from "../../index.ts"
import type { CategoryCodeProps } from "../index.ts"

export interface MedicalCodeProps {
	/** A short textual code that uniquely identifies the value. */
	codeValue?: Text
	/** The coding system, e.g. 'ICD-10'. */
	codingSystem?: Text
}

type MedicalCode =
	& Thing
	& CategoryCodeProps
	& DefinedTermProps
	& IntangibleProps
	& MedicalCodeProps

export default MedicalCode
