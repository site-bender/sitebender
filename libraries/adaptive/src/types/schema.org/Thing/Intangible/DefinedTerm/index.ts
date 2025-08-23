import type { Text, URL } from "../../../DataType/index.ts"
import type DefinedTermSet from "../../CreativeWork/DefinedTermSet/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type { CategoryCodeType } from "./CategoryCode/index.ts"

import { DefinedTermSet as DefinedTermSetComponent } from "../../../../../components/index.tsx"

export type DefinedTermType = "DefinedTerm" | CategoryCodeType

export interface DefinedTermProps {
	"@type"?: DefinedTermType
	inDefinedTermSet?:
		| DefinedTermSet
		| URL
		| ReturnType<typeof DefinedTermSetComponent>
	termCode?: Text
}

type DefinedTerm = Thing & IntangibleProps & DefinedTermProps

export default DefinedTerm
