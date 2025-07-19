import type { Language } from "../../../../bcp47/index.ts"
import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RoleProps } from "../index.ts"

export interface LinkRoleProps {
	/** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
	inLanguage?: Text | Language
	/** Indicates the relationship type of a Web link. */
	linkRelationship?: Text
}

type LinkRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& LinkRoleProps

export default LinkRole
