import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type Language from "../../Intangible/Language/index.ts"

import TouristAttractionComponent from "../../../../../components/Thing/Place/TouristAttraction/index.tsx"

export interface TouristAttractionProps {
	availableLanguage?: Language | Text
	touristType?: Audience | Text
}

type TouristAttraction =
	& Thing
	& PlaceProps
	& TouristAttractionProps

export default TouristAttraction
