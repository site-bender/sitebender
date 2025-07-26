import type {
	Boolean,
	Date,
	DateTime,
	Text,
	Time,
	URL,
} from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type { CreativeWorkProps } from "../CreativeWork/index.ts"
import type Claim from "../CreativeWork/Claim/index.ts"
import type CreativeWork from "../CreativeWork/index.ts"
import type Distance from "../Intangible/Quantity/Distance/index.ts"
import type Duration from "../Intangible/Quantity/Duration/index.ts"
import type GeoShape from "../Intangible/StructuredValue/GeoShape/index.ts"
import type MediaSubscription from "../Intangible/MediaSubscription/index.ts"
import type NewsArticle from "../CreativeWork/Article/NewsArticle/index.ts"
import type Organization from "../Organization/index.ts"
import type Place from "../Place/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface MediaObjectProps {
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
	interpretedAsClaim?: Claim
	playerType?: Text
	productionCompany?: Organization
	regionsAllowed?: Place
	requiresSubscription?: Boolean | MediaSubscription
	sha256?: Text
	startTime?: DateTime | Time
	uploadDate?: Date | DateTime
	width?: Distance | QuantitativeValue
}

type MediaObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps

export default MediaObject
