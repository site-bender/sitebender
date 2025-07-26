import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"

export interface DefinedTermSetProps {
	hasDefinedTerm?: DefinedTerm
}

type DefinedTermSet =
	& Thing
	& CreativeWorkProps
	& DefinedTermSetProps

export default DefinedTermSet
