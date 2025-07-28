import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"

import DefinedTermSetComponent from "../../../../../components/Thing/CreativeWork/DefinedTermSet/index.tsx"

export interface DefinedTermSetProps {
	hasDefinedTerm?: DefinedTerm
}

type DefinedTermSet =
	& Thing
	& CreativeWorkProps
	& DefinedTermSetProps

export default DefinedTermSet
