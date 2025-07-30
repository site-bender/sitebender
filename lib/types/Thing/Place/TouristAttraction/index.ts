import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type { PlaceProps } from "../index.ts"

import AudienceComponent from "../../../../components/Thing/Intangible/Audience/index.ts"
import LanguageComponent from "../../../../components/Thing/Intangible/Language/index.ts"

export interface TouristAttractionProps {
	"@type"?: "TouristAttraction"
	availableLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	touristType?: Audience | Text | ReturnType<typeof AudienceComponent>
}

type TouristAttraction = Thing & PlaceProps & TouristAttractionProps

export default TouristAttraction
