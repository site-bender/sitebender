import { Language } from "../../../../bcp47/index.ts"
import { Text } from "../../../../DataType/index.ts"
import Role from "../index.ts"

export default interface LinkRole extends Role {
	/** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
	inLanguage?: Text | Language
	/** Indicates the relationship type of a Web link. */
	linkRelationship?: Text
}
