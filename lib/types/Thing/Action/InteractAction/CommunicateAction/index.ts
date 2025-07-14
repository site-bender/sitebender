import { Language } from "../../../../bcp47/index.ts"
import { Text } from "../../../../DataType/index.ts"
import Thing from "../../../../index.ts"
import Audience from "../../../Intangible/Audience/index.ts"
import ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import InteractAction from "../index.ts"

export default interface CommunicateAction extends InteractAction {
	/** The subject matter of the content. */
	about?: Thing
	/** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
	inLanguage?: Text | Language
	/** A sub property of instrument. The language used on this action. */
	language?: Language
	/** A sub property of participant. The participant who is at the receiving end of the action. */
	recipient?: Organization | Audience | ContactPoint | Person
}
