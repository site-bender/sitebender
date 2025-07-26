import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type AlignmentObject from "../Intangible/AlignmentObject/index.ts"
import type Audience from "../Intangible/Audience/index.ts"
import type AudioObject from "./MediaObject/AudioObject/index.ts"
import type Claim from "./Claim/index.ts"
import type Clip from "./Clip/index.ts"
import type Comment from "./Comment/index.ts"
import type CorrectionComment from "./Comment/CorrectionComment/index.ts"
import type Country from "../Place/AdministrativeArea/Country/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type Duration from "../Intangible/Quantity/Duration/index.ts"
import type Event from "../Event/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type IPTCDigitalSourceEnumeration from "../Intangible/Enumeration/MediaEnumeration/IPTCDigitalSourceEnumeration/index.ts"
import type ImageObject from "./MediaObject/ImageObject/index.ts"
import type InteractionCounter from "../Intangible/StructuredValue/InteractionCounter/index.ts"
import type ItemList from "../Intangible/ItemList/index.ts"
import type Language from "../Intangible/Language/index.ts"
import type MediaObject from "../MediaObject/index.ts"
import type MusicRecording from "./MusicRecording/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type Organization from "../Organization/index.ts"
import type Person from "../Person/index.ts"
import type Place from "../Place/index.ts"
import type Product from "../Product/index.ts"
import type PublicationEvent from "../Event/PublicationEvent/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Rating from "../Intangible/Rating/index.ts"
import type Review from "./Review/index.ts"
import type SizeSpecification from "../Intangible/Enumeration/QualitativeValue/SizeSpecification/index.ts"
import type VideoObject from "./MediaObject/VideoObject/index.ts"
import type WebPage from "./WebPage/index.ts"

export interface CreativeWorkProps {
	about?: Thing
	abstract?: Text
	accessibilityAPI?: Text
	accessibilityControl?: Text
	accessibilityFeature?: Text
	accessibilityHazard?: Text
	accessibilitySummary?: Text
	accessMode?: Text
	accessModeSufficient?: ItemList
	accountablePerson?: Person
	acquireLicensePage?: CreativeWork | URL
	aggregateRating?: AggregateRating
	alternativeHeadline?: Text
	archivedAt?: URL | WebPage
	assesses?: DefinedTerm | Text
	associatedMedia?: MediaObject
	audience?: Audience
	audio?: AudioObject | Clip | MusicRecording
	author?: Organization | Person
	award?: Text
	awards?: Text
	character?: Person
	citation?: CreativeWork | Text
	comment?: Comment
	commentCount?: Integer
	conditionsOfAccess?: Text
	contentLocation?: Place
	contentRating?: Rating | Text
	contentReferenceTime?: DateTime
	contributor?: Organization | Person
	copyrightHolder?: Organization | Person
	copyrightNotice?: Text
	copyrightYear?: Number
	correction?: CorrectionComment | Text | URL
	countryOfOrigin?: Country
	creativeWorkStatus?: DefinedTerm | Text
	creator?: Organization | Person
	creditText?: Text
	dateCreated?: Date | DateTime
	dateModified?: Date | DateTime
	datePublished?: Date | DateTime
	digitalSourceType?: IPTCDigitalSourceEnumeration
	discussionUrl?: URL
	editEIDR?: Text | URL
	editor?: Person
	educationalAlignment?: AlignmentObject
	educationalLevel?: DefinedTerm | Text | URL
	educationalUse?: DefinedTerm | Text
	encoding?: MediaObject
	encodingFormat?: Text | URL
	encodings?: MediaObject
	exampleOfWork?: CreativeWork
	expires?: Date | DateTime
	fileFormat?: Text | URL
	funder?: Organization | Person
	funding?: Grant
	genre?: Text | URL
	hasPart?: CreativeWork
	headline?: Text
	inLanguage?: Language | Text
	interactionStatistic?: InteractionCounter
	interactivityType?: Text
	interpretedAsClaim?: Claim
	isAccessibleForFree?: Boolean
	isBasedOn?: CreativeWork | Product | URL
	isBasedOnUrl?: CreativeWork | Product | URL
	isFamilyFriendly?: Boolean
	isPartOf?: CreativeWork | URL
	keywords?: DefinedTerm | Text | URL
	learningResourceType?: DefinedTerm | Text
	license?: CreativeWork | URL
	locationCreated?: Place
	mainEntity?: Thing
	maintainer?: Organization | Person
	material?: Product | Text | URL
	materialExtent?: QuantitativeValue | Text
	mentions?: Thing
	offers?: Demand | Offer
	pattern?: DefinedTerm | Text
	position?: Integer | Text
	producer?: Organization | Person
	provider?: Organization | Person
	publication?: PublicationEvent
	publisher?: Organization | Person
	publisherImprint?: Organization
	publishingPrinciples?: CreativeWork | URL
	recordedAt?: Event
	releasedEvent?: PublicationEvent
	review?: Review
	reviews?: Review
	schemaVersion?: Text | URL
	sdDatePublished?: Date
	sdLicense?: CreativeWork | URL
	sdPublisher?: Organization | Person
	size?: DefinedTerm | QuantitativeValue | SizeSpecification | Text
	sourceOrganization?: Organization
	spatial?: Place
	spatialCoverage?: Place
	sponsor?: Organization | Person
	teaches?: DefinedTerm | Text
	temporal?: DateTime | Text
	temporalCoverage?: DateTime | Text | URL
	text?: Text
	thumbnail?: ImageObject
	thumbnailUrl?: URL
	timeRequired?: Duration
	translationOfWork?: CreativeWork
	translator?: Organization | Person
	typicalAgeRange?: Text
	usageInfo?: CreativeWork | URL
	version?: Number | Text
	video?: Clip | VideoObject
	wordCount?: Integer
	workExample?: CreativeWork
	workTranslation?: CreativeWork
}

type CreativeWork =
	& Thing
	& CreativeWorkProps

export default CreativeWork
