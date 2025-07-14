import { Language } from "../../../../bcp47/index.ts"
import { Text } from "../../../../DataType/index.ts"
import Organization from "../../../Organization/index.ts"
import Place from "../../../Place/index.ts"
import BroadcastChannel from "../../BroadcastChannel/index.ts"
import BroadcastFrequencySpecification from "../../BroadcastFrequencySpecification/index.ts"
import Service from "../index.ts"

export default interface BroadcastService extends Service {
	/** The area within which users can expect to reach the broadcast service. */
	area?: Place
	/** The media network(s) whose content is broadcast on this station. */
	broadcastAffiliateOf?: Organization
	/** The name displayed in the channel guide. For many US affiliates, it is the network name. */
	broadcastDisplayName?: Text
	/** The frequency used for over-the-air broadcasts. Numeric values or simple ranges, e.g. 87-99. In addition a shortcut idiom is supported for frequencies of AM and FM radio channels, e.g. "87 FM". */
	broadcastFrequency?: BroadcastFrequencySpecification | Text
	/** The timezone in [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601) for which the service bases its broadcasts. */
	broadcastTimezone?: Text
	/** The organization owning or operating the broadcast service. */
	broadcaster?: Organization
	/** A [callsign](https://en.wikipedia.org/wiki/Call_sign), as used in broadcasting and radio communications to identify people, radio and TV stations, or vehicles. */
	callSign?: Text
	/** A broadcast channel of a broadcast service. */
	hasBroadcastChannel?: BroadcastChannel
	/** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
	inLanguage?: Text | Language
	/** A broadcast service to which the broadcast service may belong to such as regional variations of a national channel. */
	parentService?: BroadcastService
	/** The type of screening or video broadcast used (e.g. IMAX, 3D, SD, HD, etc.). */
	videoFormat?: Text
}
