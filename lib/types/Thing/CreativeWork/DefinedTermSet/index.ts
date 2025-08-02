import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { CategoryCodeSetType } from "./CategoryCodeSet/index.ts"

import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"

export type DefinedTermSetType = "DefinedTermSet" | CategoryCodeSetType

export interface DefinedTermSetProps {
	"@type"?: DefinedTermSetType
	hasDefinedTerm?: DefinedTerm | ReturnType<typeof DefinedTermComponent>
}

type DefinedTermSet = Thing & CreativeWorkProps & DefinedTermSetProps

export default DefinedTermSet
