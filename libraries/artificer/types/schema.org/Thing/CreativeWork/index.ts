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
import type { AmpStoryType } from "./AmpStory/index.ts"
import type { ArchiveComponentType } from "./ArchiveComponent/index.ts"
import type { ArticleType } from "./Article/index.ts"
import type { AtlasType } from "./Atlas/index.ts"
import type { BlogType } from "./Blog/index.ts"
import type { BookType } from "./Book/index.ts"
import type { CertificationType } from "./Certification/index.ts"
import type { ChapterType } from "./Chapter/index.ts"
import type Claim from "./Claim/index.ts"
import type { ClaimType } from "./Claim/index.ts"
import type Clip from "./Clip/index.ts"
import type { ClipType } from "./Clip/index.ts"
import type { CodeType } from "./Code/index.ts"
import type { CollectionType } from "./Collection/index.ts"
import type { ComicStoryType } from "./ComicStory/index.ts"
import type CorrectionComment from "./Comment/CorrectionComment/index.ts"
import type Comment from "./Comment/index.ts"
import type { CommentType } from "./Comment/index.ts"
import type { ConversationType } from "./Conversation/index.ts"
import type { CourseType } from "./Course/index.ts"
import type { CreativeWorkSeasonType } from "./CreativeWorkSeason/index.ts"
import type { CreativeWorkSeriesType } from "./CreativeWorkSeries/index.ts"
import type { DataCatalogType } from "./DataCatalog/index.ts"
import type { DatasetType } from "./Dataset/index.ts"
import type { DefinedTermSetType } from "./DefinedTermSet/index.ts"
import type { DietType } from "./Diet/index.ts"
import type { DigitalDocumentType } from "./DigitalDocument/index.ts"
import type { DrawingType } from "./Drawing/index.ts"
import type { EducationalOccupationalCredentialType } from "./EducationalOccupationalCredential/index.ts"
import type { EpisodeType } from "./Episode/index.ts"
import type { ExercisePlanType } from "./ExercisePlan/index.ts"
import type { GameType } from "./Game/index.ts"
import type { GuideType } from "./Guide/index.ts"
import type { HowToType } from "./HowTo/index.ts"
import type { HowToDirectionType } from "./HowToDirection/index.ts"
import type { HowToSectionType } from "./HowToSection/index.ts"
import type { HowToStepType } from "./HowToStep/index.ts"
import type { HowToTipType } from "./HowToTip/index.ts"
import type { HyperTocType } from "./HyperToc/index.ts"
import type { HyperTocEntryType } from "./HyperTocEntry/index.ts"
import type { LearningResourceType } from "./LearningResource/index.ts"
import type { LegislationType } from "./Legislation/index.ts"
import type { ManuscriptType } from "./Manuscript/index.ts"
import type { MapType } from "./Map/index.ts"
import type { MathSolverType } from "./MathSolver/index.ts"
import type AudioObject from "./MediaObject/AudioObject/index.ts"
import type ImageObject from "./MediaObject/ImageObject/index.ts"
import type { MediaObjectType } from "./MediaObject/index.ts"
import type VideoObject from "./MediaObject/VideoObject/index.ts"
import type { MediaReviewItemType } from "./MediaReviewItem/index.ts"
import type { MenuType } from "./Menu/index.ts"
import type { MenuSectionType } from "./MenuSection/index.ts"
import type { MessageType } from "./Message/index.ts"
import type { MovieType } from "./Movie/index.ts"
import type { MusicCompositionType } from "./MusicComposition/index.ts"
import type { MusicPlaylistType } from "./MusicPlaylist/index.ts"
import type MusicRecording from "./MusicRecording/index.ts"
import type { MusicRecordingType } from "./MusicRecording/index.ts"
import type { PaintingType } from "./Painting/index.ts"
import type { PhotographType } from "./Photograph/index.ts"
import type { PlayType } from "./Play/index.ts"
import type { PosterType } from "./Poster/index.ts"
import type { PublicationIssueType } from "./PublicationIssue/index.ts"
import type { PublicationVolumeType } from "./PublicationVolume/index.ts"
import type { QuotationType } from "./Quotation/index.ts"
import type Review from "./Review/index.ts"
import type { ReviewType } from "./Review/index.ts"
import type { SculptureType } from "./Sculpture/index.ts"
import type { SeasonType } from "./Season/index.ts"
import type { SheetMusicType } from "./SheetMusic/index.ts"
import type { ShortStoryType } from "./ShortStory/index.ts"
import type { SoftwareApplicationType } from "./SoftwareApplication/index.ts"
import type { SoftwareSourceCodeType } from "./SoftwareSourceCode/index.ts"
import type { SpecialAnnouncementType } from "./SpecialAnnouncement/index.ts"
import type { StatementType } from "./Statement/index.ts"
import type { ThesisType } from "./Thesis/index.ts"
import type { TVSeasonType } from "./TVSeason/index.ts"
import type { TVSeriesType } from "./TVSeries/index.ts"
import type { VisualArtworkType } from "./VisualArtwork/index.ts"
import type { WebContentType } from "./WebContent/index.ts"
import type WebPage from "./WebPage/index.ts"
import type { WebPageType } from "./WebPage/index.ts"
import type { WebPageElementType } from "./WebPageElement/index.ts"
import type { WebSiteType } from "./WebSite/index.ts"

import ClaimComponent from "../../../../../architect/src/define/Thing/CreativeWork/Claim/index.tsx"
import ClipComponent from "../../../../../architect/src/define/Thing/CreativeWork/Clip/index.tsx"
import CorrectionCommentComponent from "../../../../../architect/src/define/Thing/CreativeWork/Comment/CorrectionComment/index.tsx"
import CommentComponent from "../../../../../architect/src/define/Thing/CreativeWork/Comment/index.tsx"
import CreativeWorkComponent from "../../../../../architect/src/define/Thing/CreativeWork/index.tsx"
import AudioObjectComponent from "../../../../../architect/src/define/Thing/CreativeWork/MediaObject/AudioObject/index.tsx"
import ImageObjectComponent from "../../../../../architect/src/define/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"
import VideoObjectComponent from "../../../../../architect/src/define/Thing/CreativeWork/MediaObject/VideoObject/index.tsx"
import MusicRecordingComponent from "../../../../../architect/src/define/Thing/CreativeWork/MusicRecording/index.tsx"
import ReviewComponent from "../../../../../architect/src/define/Thing/CreativeWork/Review/index.tsx"
import WebPageComponent from "../../../../../architect/src/define/Thing/CreativeWork/WebPage/index.tsx"
import EventComponent from "../../../../../architect/src/define/Thing/Event/index.tsx"
import PublicationEventComponent from "../../../../../architect/src/define/Thing/Event/PublicationEvent/index.tsx"
import ThingComponent from "../../../../../architect/src/define/Thing/index.tsx"
import AlignmentObjectComponent from "../../../../../architect/src/define/Thing/Intangible/AlignmentObject/index.tsx"
import AudienceComponent from "../../../../../architect/src/define/Thing/Intangible/Audience/index.tsx"
import DefinedTermComponent from "../../../../../architect/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import DemandComponent from "../../../../../architect/src/define/Thing/Intangible/Demand/index.tsx"
import IPTCDigitalSourceEnumerationComponent from "../../../../../architect/src/define/Thing/Intangible/Enumeration/MediaEnumeration/IPTCDigitalSourceEnumeration/index.tsx"
import SizeSpecificationComponent from "../../../../../architect/src/define/Thing/Intangible/Enumeration/QualitativeValue/SizeSpecification/index.tsx"
import GrantComponent from "../../../../../architect/src/define/Thing/Intangible/Grant/index.tsx"
import ItemListComponent from "../../../../../architect/src/define/Thing/Intangible/ItemList/index.tsx"
import LanguageComponent from "../../../../../architect/src/define/Thing/Intangible/Language/index.tsx"
import OfferComponent from "../../../../../architect/src/define/Thing/Intangible/Offer/index.tsx"
import DurationComponent from "../../../../../architect/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import AggregateRatingComponent from "../../../../../architect/src/define/Thing/Intangible/Rating/AggregateRating/index.tsx"
import RatingComponent from "../../../../../architect/src/define/Thing/Intangible/Rating/index.tsx"
import InteractionCounterComponent from "../../../../../architect/src/define/Thing/Intangible/StructuredValue/InteractionCounter/index.tsx"
import QuantitativeValueComponent from "../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import OrganizationComponent from "../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../architect/src/define/Thing/Person/index.tsx"
import CountryComponent from "../../../../../architect/src/define/Thing/Place/AdministrativeArea/Country/index.tsx"
import PlaceComponent from "../../../../../architect/src/define/Thing/Place/index.tsx"
import ProductComponent from "../../../../../architect/src/define/Thing/Product/index.tsx"
import { MediaObject as MediaObjectComponent } from "../../../../architect/index.tsx"

export type CreativeWorkType =
	| "CreativeWork"
	| QuotationType
	| GuideType
	| ManuscriptType
	| VisualArtworkType
	| AmpStoryType
	| HowToTipType
	| SculptureType
	| DrawingType
	| MathSolverType
	| MovieType
	| LearningResourceType
	| TVSeriesType
	| CollectionType
	| CreativeWorkSeasonType
	| CourseType
	| ComicStoryType
	| WebContentType
	| MusicPlaylistType
	| CommentType
	| ClipType
	| EducationalOccupationalCredentialType
	| DatasetType
	| MenuSectionType
	| HyperTocType
	| EpisodeType
	| PhotographType
	| WebSiteType
	| StatementType
	| CodeType
	| SpecialAnnouncementType
	| DefinedTermSetType
	| MediaObjectType
	| MessageType
	| DietType
	| GameType
	| ChapterType
	| BlogType
	| WebPageElementType
	| MediaReviewItemType
	| ArchiveComponentType
	| MusicCompositionType
	| MapType
	| DigitalDocumentType
	| MusicRecordingType
	| PaintingType
	| PublicationIssueType
	| PublicationVolumeType
	| ReviewType
	| MenuType
	| ExercisePlanType
	| BookType
	| SoftwareSourceCodeType
	| ShortStoryType
	| SoftwareApplicationType
	| ThesisType
	| SeasonType
	| AtlasType
	| LegislationType
	| ArticleType
	| HowToType
	| TVSeasonType
	| PlayType
	| HowToDirectionType
	| HyperTocEntryType
	| HowToSectionType
	| HowToStepType
	| CreativeWorkSeriesType
	| SheetMusicType
	| DataCatalogType
	| CertificationType
	| PosterType
	| ClaimType
	| WebPageType
	| ConversationType

export interface CreativeWorkProps {
	"@type"?: CreativeWorkType
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
	educationalUse?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
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
	keywords?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
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
	publication?:
		| PublicationEvent
		| ReturnType<typeof PublicationEventComponent>
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
