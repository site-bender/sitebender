import type {
	Boolean,
	Date,
	DateTime,
	Text,
	Time,
} from "../../../DataType/index.ts"
import type {
	Distance,
	Duration,
	GeoShape,
	MediaSubscription,
	NewsArticle,
	URL,
} from "../../index.ts"
import type { QuantitativeValue } from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { Organization } from "../../Organization/index.ts"
import type { Place } from "../../Place/index.ts"
import type { CreativeWork } from "../index.ts"

// MediaObject interface - extends CreativeWork
// A media object, such as an image, video, audio, or text object embedded in a web page or a downloadable dataset
export interface MediaObject extends CreativeWork {
	associatedArticle?: NewsArticle
	bitrate?: Text
	contentSize?: Text
	contentUrl?: URL
	duration?: Duration | QuantitativeValue
	embedUrl?: URL
	encodesCreativeWork?: CreativeWork
	encodingFormat?: Text | URL
	endTime?: DateTime | Time
	height?: Distance | QuantitativeValue
	ineligibleRegion?: GeoShape | Place | Text
	playerType?: Text
	productionCompany?: Organization
	regionsAllowed?: Place
	requiresSubscription?: Boolean | MediaSubscription
	startTime?: DateTime | Time
	uploadDate?: Date | DateTime
	width?: Distance | QuantitativeValue
}
