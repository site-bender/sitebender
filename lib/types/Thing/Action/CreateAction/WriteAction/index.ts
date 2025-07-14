import { Language } from "../../../../bcp47/index.ts"
import { Text } from "../../../../DataType/index.ts"
import CreateAction from "../index.ts"

export default interface WriteAction extends CreateAction {
	/** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
	inLanguage?: Text | Language
	/** A sub property of instrument. The language used on this action. */
	language?: Language
}
