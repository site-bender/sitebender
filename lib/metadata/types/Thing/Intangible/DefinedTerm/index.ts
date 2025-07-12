import type { Text } from "../../../DataType/index.ts"
import type { DefinedTermSet, URL } from "../../index.ts"
import type { Intangible } from "../index.ts"

// DefinedTerm interface - extends Intangible
// A word, name, acronym, phrase, etc. with a formal definition. Often used in the context of
// category or subject classification, glossaries or dictionaries, product or creative work types, etc.
export interface DefinedTerm extends Intangible {
	inDefinedTermSet?: DefinedTermSet | URL
	termCode?: Text
}
