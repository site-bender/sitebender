import type { Text } from "../../../DataType/index.ts"
import type Movie from "../../CreativeWork/Movie/index.ts"
import type Thing from "../../index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type { EventProps } from "../index.ts"

import MovieComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/Movie/index.tsx"
import LanguageComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Language/index.tsx"

export type ScreeningEventType = "ScreeningEvent"

export interface ScreeningEventProps {
	"@type"?: ScreeningEventType
	subtitleLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	videoFormat?: Text
	workPresented?: Movie | ReturnType<typeof MovieComponent>
}

type ScreeningEvent = Thing & EventProps & ScreeningEventProps

export default ScreeningEvent
