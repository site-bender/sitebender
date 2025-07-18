import type { Language } from "../../../bcp47/index.ts"
import type { Text } from "../../../DataType/index.ts"
import type Movie from "../../CreativeWork/Movie/index.ts"
import type Event from "../index.ts"

export default interface ScreeningEvent extends Event {
	/** Languages in which subtitles/captions are available, in [IETF BCP 47 standard format](http://tools.ietf.org/html/bcp47). */
	subtitleLanguage?: Language | Text
	/** The type of screening or video broadcast used (e.g. IMAX, 3D, SD, HD, etc.). */
	videoFormat?: Text
	/** The movie presented during this event. */
	workPresented?: Movie
}
