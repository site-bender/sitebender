import { Language } from "../../../bcp47/index.ts"
import { Text } from "../../../DataType/index.ts"
import Audience from "../../Intangible/Audience/index.ts"
import Place from "../index.ts"

export default interface TouristAttraction extends Place {
	/** A language someone may use with or at the item, service or place. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[inLanguage]]. */
	availableLanguage?: Text | Language
	/** Attraction suitable for type(s) of tourist. E.g. children, visitors from a particular country, etc. */
	touristType?: Audience | Text
}
