import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type DefinedTermSet from "../../CreativeWork/DefinedTermSet/index.ts"

import DefinedTermComponent from "../../../../../components/Thing/Intangible/DefinedTerm/index.tsx"

export interface DefinedTermProps {
	inDefinedTermSet?: DefinedTermSet | URL
	termCode?: Text
}

type DefinedTerm =
	& Thing
	& IntangibleProps
	& DefinedTermProps

export default DefinedTerm
