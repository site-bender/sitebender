import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CategoryCodeProps } from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type { DefinedTermProps } from "../../../Intangible/DefinedTerm/index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

export interface MedicalCodeProps {
	codeValue?: Text
	codingSystem?: Text
}

type MedicalCode =
	& Thing
	& IntangibleProps
	& DefinedTermProps
	& CategoryCodeProps
	& MedicalEntityProps
	& MedicalIntangibleProps
	& MedicalCodeProps

export default MedicalCode
