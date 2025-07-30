import type { Text, URL } from "../../../DataType/index.ts"
import type DefinedTermSet from "../../CreativeWork/DefinedTermSet/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import DefinedTermSetComponent from "../../../../components/Thing/CreativeWork/DefinedTermSet/index.ts"

export interface DefinedTermProps {
	"@type"?: "DefinedTerm"
	inDefinedTermSet?:
		| DefinedTermSet
		| URL
		| ReturnType<typeof DefinedTermSetComponent>
	termCode?: Text
}

type DefinedTerm = Thing & IntangibleProps & DefinedTermProps

export default DefinedTerm
