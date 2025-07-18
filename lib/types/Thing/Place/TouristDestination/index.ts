import type { Text } from "../../../DataType/index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type Place from "../index.ts"
import type TouristAttraction from "../TouristAttraction/index.ts"

export default interface TouristDestination extends Place {
	/** Attraction located at destination. */
	includesAttraction?: TouristAttraction
	/** Attraction suitable for type(s) of tourist. E.g. children, visitors from a particular country, etc. */
	touristType?: Audience | Text
}
