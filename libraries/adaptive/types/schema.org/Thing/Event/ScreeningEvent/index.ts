import type { Text } from "../../../DataType/index.ts"
import type Movie from "../../CreativeWork/Movie/index.ts"
import type Thing from "../../index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type { EventProps } from "../index.ts"

import { Language as LanguageComponent } from "../../../../../components/index.tsx"
import { Movie as MovieComponent } from "../../../../../components/index.tsx"

export type ScreeningEventType = "ScreeningEvent"

export interface ScreeningEventProps {
	"@type"?: ScreeningEventType
	subtitleLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	videoFormat?: Text
	workPresented?: Movie | ReturnType<typeof MovieComponent>
}

type ScreeningEvent = Thing & EventProps & ScreeningEventProps

export default ScreeningEvent
