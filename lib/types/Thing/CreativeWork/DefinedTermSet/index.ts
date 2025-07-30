import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"

export interface DefinedTermSetProps {
	"@type"?: "DefinedTermSet"
	hasDefinedTerm?: DefinedTerm | ReturnType<typeof DefinedTermComponent>
}

type DefinedTermSet = Thing & CreativeWorkProps & DefinedTermSetProps

export default DefinedTermSet
