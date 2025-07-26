import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type Movie from "../../CreativeWork/Movie/index.ts"

export interface ScreeningEventProps {
	subtitleLanguage?: Language | Text
	videoFormat?: Text
	workPresented?: Movie
}

type ScreeningEvent =
	& Thing
	& EventProps
	& ScreeningEventProps

export default ScreeningEvent
