import type { Text, URL } from "../../../../DataType/index.ts"
import type CategoryCodeSet from "../../../CreativeWork/DefinedTermSet/CategoryCodeSet/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { DefinedTermProps } from "../index.ts"
import type { MedicalCodeType } from "./MedicalCode/index.ts"

import { CategoryCodeSet as CategoryCodeSetComponent } from "../../../../../../components/index.tsx"

export type CategoryCodeType = "CategoryCode" | MedicalCodeType

export interface CategoryCodeProps {
	"@type"?: CategoryCodeType
	codeValue?: Text
	inCodeSet?:
		| CategoryCodeSet
		| URL
		| ReturnType<typeof CategoryCodeSetComponent>
}

type CategoryCode =
	& Thing
	& IntangibleProps
	& DefinedTermProps
	& CategoryCodeProps

export default CategoryCode
