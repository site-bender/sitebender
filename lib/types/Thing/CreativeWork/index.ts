import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../DataType/index.ts"
import type Event from "../Event/index.ts"
import type PublicationEvent from "../Event/PublicationEvent/index.ts"
import type Thing from "../index.ts"
import type AlignmentObject from "../Intangible/AlignmentObject/index.ts"
import type Audience from "../Intangible/Audience/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type IPTCDigitalSourceEnumeration from "../Intangible/Enumeration/MediaEnumeration/IPTCDigitalSourceEnumeration/index.ts"
import type SizeSpecification from "../Intangible/Enumeration/QualitativeValue/SizeSpecification/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type ItemList from "../Intangible/ItemList/index.ts"
import type Language from "../Intangible/Language/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type Duration from "../Intangible/Quantity/Duration/index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type Rating from "../Intangible/Rating/index.ts"
import type InteractionCounter from "../Intangible/StructuredValue/InteractionCounter/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type MediaObject from "../MediaObject/index.ts"
import type Organization from "../Organization/index.ts"
import type Person from "../Person/index.ts"
import type Country from "../Place/AdministrativeArea/Country/index.ts"
import type Place from "../Place/index.ts"
import type Product from "../Product/index.ts"
import type Claim from "./Claim/index.ts"
import type Clip from "./Clip/index.ts"
import type CorrectionComment from "./Comment/CorrectionComment/index.ts"
import type Comment from "./Comment/index.ts"
import type AudioObject from "./MediaObject/AudioObject/index.ts"
import type ImageObject from "./MediaObject/ImageObject/index.ts"
import type VideoObject from "./MediaObject/VideoObject/index.ts"
import type MusicRecording from "./MusicRecording/index.ts"
import type Review from "./Review/index.ts"
import type WebPage from "./WebPage/index.ts"

import ClaimComponent from "../../../components/Thing/CreativeWork/Claim/index.ts"
import ClipComponent from "../../../components/Thing/CreativeWork/Clip/index.ts"
import CorrectionCommentComponent from "../../../components/Thing/CreativeWork/Comment/CorrectionComment/index.ts"
import CommentComponent from "../../../components/Thing/CreativeWork/Comment/index.ts"
import CreativeWorkComponent from "../../../components/Thing/CreativeWork/index.ts"
import AudioObjectComponent from "../../../components/Thing/CreativeWork/MediaObject/AudioObject/index.ts"
import ImageObjectComponent from "../../../components/Thing/CreativeWork/MediaObject/ImageObject/index.ts"
import VideoObjectComponent from "../../../components/Thing/CreativeWork/MediaObject/VideoObject/index.ts"
import MusicRecordingComponent from "../../../components/Thing/CreativeWork/MusicRecording/index.ts"
import ReviewComponent from "../../../components/Thing/CreativeWork/Review/index.ts"
import WebPageComponent from "../../../components/Thing/CreativeWork/WebPage/index.ts"
import EventComponent from "../../../components/Thing/Event/index.ts"
import PublicationEventComponent from "../../../components/Thing/Event/PublicationEvent/index.ts"
import ThingComponent from "../../../components/Thing/index.ts"
import AlignmentObjectComponent from "../../../components/Thing/Intangible/AlignmentObject/index.ts"
import AudienceComponent from "../../../components/Thing/Intangible/Audience/index.ts"
import DefinedTermComponent from "../../../components/Thing/Intangible/DefinedTerm/index.ts"
import DemandComponent from "../../../components/Thing/Intangible/Demand/index.ts"
import IPTCDigitalSourceEnumerationComponent from "../../../components/Thing/Intangible/Enumeration/MediaEnumeration/IPTCDigitalSourceEnumeration/index.ts"
import SizeSpecificationComponent from "../../../components/Thing/Intangible/Enumeration/QualitativeValue/SizeSpecification/index.ts"
import GrantComponent from "../../../components/Thing/Intangible/Grant/index.ts"
import ItemListComponent from "../../../components/Thing/Intangible/ItemList/index.ts"
import LanguageComponent from "../../../components/Thing/Intangible/Language/index.ts"
import OfferComponent from "../../../components/Thing/Intangible/Offer/index.ts"
import DurationComponent from "../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import AggregateRatingComponent from "../../../components/Thing/Intangible/Rating/AggregateRating/index.ts"
import RatingComponent from "../../../components/Thing/Intangible/Rating/index.ts"
import InteractionCounterComponent from "../../../components/Thing/Intangible/StructuredValue/InteractionCounter/index.ts"
import QuantitativeValueComponent from "../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import MediaObjectComponent from "../../../components/Thing/MediaObject/index.ts"
import OrganizationComponent from "../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../components/Thing/Person/index.ts"
import CountryComponent from "../../../components/Thing/Place/AdministrativeArea/Country/index.ts"
import PlaceComponent from "../../../components/Thing/Place/index.ts"
import ProductComponent from "../../../components/Thing/Product/index.ts"

export interface CreativeWorkProps {
	about?: Thing | ReturnType<typeof ThingComponent>
	abstract?: Text
	accessibilityAPI?: Text
	accessibilityControl?: Text
	accessibilityFeature?: Text
	accessibilityHazard?: Text
	accessibilitySummary?: Text
	accessMode?: Text
	accessModeSufficient?: ItemList | ReturnType<typeof ItemListComponent>
	accountablePerson?: Person | ReturnType<typeof PersonComponent>
	acquireLicensePage?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	aggregateRating?:
		| AggregateRating
		| ReturnType<typeof AggregateRatingComponent>
	alternativeHeadline?: Text
	archivedAt?: URL | WebPage | ReturnType<typeof WebPageComponent>
	assesses?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	associatedMedia?: MediaObject | ReturnType<typeof MediaObjectComponent>
	audience?: Audience | ReturnType<typeof AudienceComponent>
	audio?:
		| AudioObject
		| Clip
		| MusicRecording
		| ReturnType<typeof AudioObjectComponent>
		| ReturnType<typeof ClipComponent>
		| ReturnType<typeof MusicRecordingComponent>
	author?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	award?: Text
	awards?: Text
	character?: Person | ReturnType<typeof PersonComponent>
	citation?: CreativeWork | Text | ReturnType<typeof CreativeWorkComponent>
	comment?: Comment | ReturnType<typeof CommentComponent>
	commentCount?: Integer
	conditionsOfAccess?: Text
	contentLocation?: Place | ReturnType<typeof PlaceComponent>
	contentRating?: Rating | Text | ReturnType<typeof RatingComponent>
	contentReferenceTime?: DateTime
	contributor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	copyrightHolder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	copyrightNotice?: Text
	copyrightYear?: Number
	correction?:
		| CorrectionComment
		| Text
		| URL
		| ReturnType<typeof CorrectionCommentComponent>
	countryOfOrigin?: Country | ReturnType<typeof CountryComponent>
	creativeWorkStatus?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
	creator?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	creditText?: Text
	dateCreated?: Date | DateTime
	dateModified?: Date | DateTime
	datePublished?: Date | DateTime
	digitalSourceType?:
		| IPTCDigitalSourceEnumeration
		| ReturnType<typeof IPTCDigitalSourceEnumerationComponent>
	discussionUrl?: URL
	editEIDR?: Text | URL
	editor?: Person | ReturnType<typeof PersonComponent>
	educationalAlignment?:
		| AlignmentObject
		| ReturnType<typeof AlignmentObjectComponent>
	educationalLevel?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	educationalUse?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	encoding?: MediaObject | ReturnType<typeof MediaObjectComponent>
	encodingFormat?: Text | URL
	encodings?: MediaObject | ReturnType<typeof MediaObjectComponent>
	exampleOfWork?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	expires?: Date | DateTime
	fileFormat?: Text | URL
	funder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	funding?: Grant | ReturnType<typeof GrantComponent>
	genre?: Text | URL
	hasPart?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	headline?: Text
	inLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	interactionStatistic?:
		| InteractionCounter
		| ReturnType<typeof InteractionCounterComponent>
	interactivityType?: Text
	interpretedAsClaim?: Claim | ReturnType<typeof ClaimComponent>
	isAccessibleForFree?: Boolean
	isBasedOn?:
		| CreativeWork
		| Product
		| URL
		| ReturnType<typeof CreativeWorkComponent>
		| ReturnType<typeof ProductComponent>
	isBasedOnUrl?:
		| CreativeWork
		| Product
		| URL
		| ReturnType<typeof CreativeWorkComponent>
		| ReturnType<typeof ProductComponent>
	isFamilyFriendly?: Boolean
	isPartOf?: CreativeWork | URL | ReturnType<typeof CreativeWorkComponent>
	keywords?: DefinedTerm | Text | URL | ReturnType<typeof DefinedTermComponent>
	learningResourceType?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
	license?: CreativeWork | URL | ReturnType<typeof CreativeWorkComponent>
	locationCreated?: Place | ReturnType<typeof PlaceComponent>
	mainEntity?: Thing | ReturnType<typeof ThingComponent>
	maintainer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	material?: Product | Text | URL | ReturnType<typeof ProductComponent>
	materialExtent?:
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
	mentions?: Thing | ReturnType<typeof ThingComponent>
	offers?:
		| Demand
		| Offer
		| ReturnType<typeof DemandComponent>
		| ReturnType<typeof OfferComponent>
	pattern?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	position?: Integer | Text
	producer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	publication?: PublicationEvent | ReturnType<typeof PublicationEventComponent>
	publisher?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	publisherImprint?: Organization | ReturnType<typeof OrganizationComponent>
	publishingPrinciples?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	recordedAt?: Event | ReturnType<typeof EventComponent>
	releasedEvent?:
		| PublicationEvent
		| ReturnType<typeof PublicationEventComponent>
	review?: Review | ReturnType<typeof ReviewComponent>
	reviews?: Review | ReturnType<typeof ReviewComponent>
	schemaVersion?: Text | URL
	sdDatePublished?: Date
	sdLicense?: CreativeWork | URL | ReturnType<typeof CreativeWorkComponent>
	sdPublisher?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	size?:
		| DefinedTerm
		| QuantitativeValue
		| SizeSpecification
		| Text
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof SizeSpecificationComponent>
	sourceOrganization?: Organization | ReturnType<typeof OrganizationComponent>
	spatial?: Place | ReturnType<typeof PlaceComponent>
	spatialCoverage?: Place | ReturnType<typeof PlaceComponent>
	sponsor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	teaches?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	temporal?: DateTime | Text
	temporalCoverage?: DateTime | Text | URL
	text?: Text
	thumbnail?: ImageObject | ReturnType<typeof ImageObjectComponent>
	thumbnailUrl?: URL
	timeRequired?: Duration | ReturnType<typeof DurationComponent>
	translationOfWork?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	translator?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	typicalAgeRange?: Text
	usageInfo?: CreativeWork | URL | ReturnType<typeof CreativeWorkComponent>
	version?: Number | Text
	video?:
		| Clip
		| VideoObject
		| ReturnType<typeof ClipComponent>
		| ReturnType<typeof VideoObjectComponent>
	wordCount?: Integer
	workExample?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	workTranslation?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
}

type CreativeWork = Thing & CreativeWorkProps

export default CreativeWork
