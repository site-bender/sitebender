import type { Text, URL } from "../../../DataType/index.ts"
import type DefinedTermSet from "../../CreativeWork/DefinedTermSet/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface DefinedTermProps {
	/** A [[DefinedTermSet]] that contains this term. */
	inDefinedTermSet?: DefinedTermSet | URL
	/** A code that identifies this [[DefinedTerm]] within a [[DefinedTermSet]]. */
	termCode?: Text
}

type DefinedTerm =
	& Thing
	& IntangibleProps
	& DefinedTermProps

export default DefinedTerm
