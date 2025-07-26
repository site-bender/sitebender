import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type TouristAttraction from "../TouristAttraction/index.ts"

export interface TouristDestinationProps {
	includesAttraction?: TouristAttraction
	touristType?: Audience | Text
}

type TouristDestination =
	& Thing
	& PlaceProps
	& TouristDestinationProps

export default TouristDestination
