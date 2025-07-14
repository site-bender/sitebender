import { Text } from "../../../DataType/index.ts"
import Audience from "../../Intangible/Audience/index.ts"
import Place from "../index.ts"
import TouristAttraction from "../TouristAttraction/index.ts"

export default interface TouristDestination extends Place {
	/** Attraction located at destination. */
	includesAttraction?: TouristAttraction
	/** Attraction suitable for type(s) of tourist. E.g. children, visitors from a particular country, etc. */
	touristType?: Audience | Text
}
