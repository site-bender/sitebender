import type {
	Boolean,
	Date,
	DateTime,
	Text,
	Time,
	URL,
} from "../../DataType/index.ts"
import type NewsArticle from "../CreativeWork/Article/NewsArticle/index.ts"
import type Claim from "../CreativeWork/Claim/index.ts"
import type CreativeWork from "../CreativeWork/index.ts"
import type { CreativeWorkProps } from "../CreativeWork/index.ts"
import type Thing from "../index.ts"
import type MediaSubscription from "../Intangible/MediaSubscription/index.ts"
import type Distance from "../Intangible/Quantity/Distance/index.ts"
import type Duration from "../Intangible/Quantity/Duration/index.ts"
import type GeoShape from "../Intangible/StructuredValue/GeoShape/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../Organization/index.ts"
import type Place from "../Place/index.ts"

import NewsArticleComponent from "../../../components/Thing/CreativeWork/Article/NewsArticle/index.ts"
import ClaimComponent from "../../../components/Thing/CreativeWork/Claim/index.ts"
import CreativeWorkComponent from "../../../components/Thing/CreativeWork/index.ts"
import MediaSubscriptionComponent from "../../../components/Thing/Intangible/MediaSubscription/index.ts"
import DistanceComponent from "../../../components/Thing/Intangible/Quantity/Distance/index.ts"
import DurationComponent from "../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import GeoShapeComponent from "../../../components/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import QuantitativeValueComponent from "../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import OrganizationComponent from "../../../components/Thing/Organization/index.ts"
import PlaceComponent from "../../../components/Thing/Place/index.ts"

export type MediaObjectType = "MediaObject"

export interface MediaObjectProps {
	"@type"?: MediaObjectType
	associatedArticle?: NewsArticle | ReturnType<typeof NewsArticleComponent>
	bitrate?: Text
	contentSize?: Text
	contentUrl?: URL
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	embedUrl?: URL
	encodesCreativeWork?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	encodingFormat?: Text | URL
	endTime?: DateTime | Time
	height?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	ineligibleRegion?:
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	interpretedAsClaim?: Claim | ReturnType<typeof ClaimComponent>
	playerType?: Text
	productionCompany?: Organization | ReturnType<typeof OrganizationComponent>
	regionsAllowed?: Place | ReturnType<typeof PlaceComponent>
	requiresSubscription?:
		| Boolean
		| MediaSubscription
		| ReturnType<typeof MediaSubscriptionComponent>
	sha256?: Text
	startTime?: DateTime | Time
	uploadDate?: Date | DateTime
	width?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
}

type MediaObject = Thing & CreativeWorkProps & MediaObjectProps

export default MediaObject
