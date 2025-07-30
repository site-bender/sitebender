import type { Text } from "../../../DataType/index.ts"
import type Movie from "../../CreativeWork/Movie/index.ts"
import type Thing from "../../index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type { EventProps } from "../index.ts"

import MovieComponent from "../../../../components/Thing/CreativeWork/Movie/index.ts"
import LanguageComponent from "../../../../components/Thing/Intangible/Language/index.ts"

export interface ScreeningEventProps {
	"@type"?: "ScreeningEvent"
	subtitleLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	videoFormat?: Text
	workPresented?: Movie | ReturnType<typeof MovieComponent>
}

type ScreeningEvent = Thing & EventProps & ScreeningEventProps

export default ScreeningEvent
