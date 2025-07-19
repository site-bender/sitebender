import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface DefinedTermSetProps {
	/** A Defined Term contained in this term set. */
	hasDefinedTerm?: DefinedTerm
}

type DefinedTermSet =
	& Thing
	& CreativeWorkProps
	& DefinedTermSetProps

export default DefinedTermSet
