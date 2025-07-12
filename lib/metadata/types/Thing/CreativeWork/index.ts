import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Number,
	Text,
} from "../../DataType/index.ts"
import type {
	AggregateRating,
	AlignmentObject,
	AudioObject,
	Claim,
	Clip,
	CorrectionComment,
	Country,
	Demand,
	Duration,
	Grant,
	InteractionCounter,
	ItemList,
	MusicRecording,
	PublicationEvent,
	SizeSpecification,
	Thing,
	URL,
	VideoObject,
} from "../index.ts"
import type { Audience } from "../Intangible/Audience/index.ts"
import type { DefinedTerm } from "../Intangible/DefinedTerm/index.ts"
import type { Language } from "../Intangible/Language/index.ts"
import type { Offer } from "../Intangible/Offer/index.ts"
import type { Rating } from "../Intangible/Rating/index.ts"
import type { QuantitativeValue } from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { Organization } from "../Organization/index.ts"
import type { Person } from "../Person/index.ts"
import type { Place } from "../Place/index.ts"
import type { Product } from "../Product/index.ts"
import type { Comment } from "./Comment/index.ts"
import type { MediaObject } from "./MediaObject/index.ts"
import type { Review } from "./Review/index.ts"

// CreativeWork interface - extends Thing
export interface CreativeWork extends Thing {
	about?: Thing
	abstract?: Text
	accessMode?: Text
	accessModeSufficient?: ItemList
	accessibilityAPI?: Text
	accessibilityControl?: Text
	accessibilityFeature?: Text
	accessibilityHazard?: Text
	accessibilitySummary?: Text
	accountablePerson?: Person
	acquireLicensePage?: CreativeWork | URL
	aggregateRating?: AggregateRating
	alternativeHeadline?: Text
	associatedMedia?: MediaObject
	audience?: Audience
	audio?: AudioObject | Clip | MusicRecording
	author?: Organization | Person
	award?: Text
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
	discussionUrl?: URL
	editEIDR?: Text | URL
	editor?: Person
	educationalAlignment?: AlignmentObject
	educationalLevel?: DefinedTerm | Text | URL
	educationalUse?: DefinedTerm | Text
	encoding?: MediaObject
	encodingFormat?: Text | URL
	exampleOfWork?: CreativeWork
	expires?: Date | DateTime
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
	schemaVersion?: Text | URL
	sdDatePublished?: Date
	sdLicense?: CreativeWork | URL
	sdPublisher?: Organization | Person
	size?: DefinedTerm | QuantitativeValue | SizeSpecification | Text
	sourceOrganization?: Organization
	spatial?: Place
	spatialCoverage?: Place
	sponsor?: Organization | Person
	temporal?: DateTime | Text
	temporalCoverage?: DateTime | Text | URL
	text?: Text
	thumbnailUrl?: URL
	timeRequired?: Duration
	translationOfWork?: CreativeWork
	translator?: Organization | Person
	typicalAgeRange?: Text
	usageInfo?: CreativeWork | URL
	version?: Number | Text
	video?: Clip | VideoObject
	workExample?: CreativeWork
	workTranslation?: CreativeWork
}
