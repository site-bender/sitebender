import { Language } from "../../bcp47/index.ts"
import { Date, Text, URL } from "../../DataType/index.ts"
import Article from "../CreativeWork/Article/index.ts"
import Certification from "../CreativeWork/Certification/index.ts"
import EducationalOccupationalCredential from "../CreativeWork/EducationalOccupationalCredential/index.ts"
import CreativeWork from "../CreativeWork/index.ts"
import ImageObject from "../CreativeWork/MediaObject/ImageObject/index.ts"
import Review from "../CreativeWork/Review/index.ts"
import AboutPage from "../CreativeWork/WebPage/AboutPage/index.ts"
import Event from "../Event/index.ts"
import Thing from "../index.ts"
import Brand from "../Intangible/Brand/index.ts"
import DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import Demand from "../Intangible/Demand/index.ts"
import NonprofitType from "../Intangible/Enumeration/NonprofitType/index.ts"
import Grant from "../Intangible/Grant/index.ts"
import OfferCatalog from "../Intangible/ItemList/OfferCatalog/index.ts"
import MemberProgram from "../Intangible/MemberProgram/index.ts"
import MemberProgramTier from "../Intangible/MemberProgramTier/index.ts"
import MerchantReturnPolicy from "../Intangible/MerchantReturnPolicy/index.ts"
import Offer from "../Intangible/Offer/index.ts"
import PaymentMethod from "../Intangible/PaymentMethod/index.ts"
import ProgramMembership from "../Intangible/ProgramMembership/index.ts"
import AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import LoanOrCredit from "../Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"
import ContactPoint from "../Intangible/StructuredValue/ContactPoint/index.ts"
import PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import GeoShape from "../Intangible/StructuredValue/GeoShape/index.ts"
import InteractionCounter from "../Intangible/StructuredValue/InteractionCounter/index.ts"
import OwnershipInfo from "../Intangible/StructuredValue/OwnershipInfo/index.ts"
import QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import ShippingService from "../Intangible/StructuredValue/ShippingService/index.ts"
import VirtualLocation from "../Intangible/VirtualLocation/index.ts"
import Person from "../Person/index.ts"
import AdministrativeArea from "../Place/AdministrativeArea/index.ts"
import Place from "../Place/index.ts"
import Product from "../Product/index.ts"

export default interface Organization extends Thing {
	/** The payment method(s) that are accepted in general by an organization, or for some specific demand or offer. */
	acceptedPaymentMethod?: LoanOrCredit | Text | PaymentMethod
	/** For a [[NewsMediaOrganization]] or other news-related [[Organization]], a statement about public engagement activities (for news media, the newsroom’s), including involving the public - digitally or otherwise -- in coverage decisions, reporting and activities after publication. */
	actionableFeedbackPolicy?: CreativeWork | URL
	/** Physical address of the item. */
	address?: Text | PostalAddress
	/** The number of completed interactions for this entity, in a particular role (the 'agent'), in a particular action (indicated in the statistic), and in a particular context (i.e. interactionService). */
	agentInteractionStatistic?: InteractionCounter
	/** The overall rating, based on a collection of reviews or ratings, of the item. */
	aggregateRating?: AggregateRating
	/** Alumni of an organization. */
	alumni?: Person
	/** The geographic area where a service or offered item is provided. */
	areaServed?: AdministrativeArea | Place | GeoShape | Text
	/** An award won by or for this item. */
	award?: Text
	/** Awards won by or for this item. */
	awards?: Text
	/** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
	brand?: Brand | Organization
	/** The official registration number of a business including the organization that issued it such as Company House or Chamber of Commerce. */
	companyRegistration?: Certification
	/** A contact point for a person or organization. */
	contactPoint?: ContactPoint
	/** A contact point for a person or organization. */
	contactPoints?: ContactPoint
	/** For an [[Organization]] (e.g. [[NewsMediaOrganization]]), a statement describing (in news media, the newsroom’s) disclosure and correction policy for errors. */
	correctionsPolicy?: URL | CreativeWork
	/** A relationship between an organization and a department of that organization, also described as an organization (allowing different urls, logos, opening hours). For example: a store with a pharmacy, or a bakery with a cafe. */
	department?: Organization
	/** The date that this organization was dissolved. */
	dissolutionDate?: Date
	/** Statement on diversity policy by an [[Organization]] e.g. a [[NewsMediaOrganization]]. For a [[NewsMediaOrganization]], a statement describing the newsroom’s diversity policy on both staffing and sources, typically providing staffing data. */
	diversityPolicy?: URL | CreativeWork
	/** For an [[Organization]] (often but not necessarily a [[NewsMediaOrganization]]), a report on staffing diversity issues. In a news context this might be for example ASNE or RTDNA (US) reports, or self-reported. */
	diversityStaffingReport?: Article | URL
	/** The Dun & Bradstreet DUNS number for identifying an organization or business person. */
	duns?: Text
	/** Email address. */
	email?: Text
	/** Someone working for this organization. */
	employee?: Person
	/** People working for this organization. */
	employees?: Person
	/** Statement about ethics policy, e.g. of a [[NewsMediaOrganization]] regarding journalistic and publishing practices, or of a [[Restaurant]], a page describing food source policies. In the case of a [[NewsMediaOrganization]], an ethicsPolicy is typically a statement describing the personal, organizational, and corporate standards of behavior expected by the organization. */
	ethicsPolicy?: CreativeWork | URL
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
	/** Upcoming or past events associated with this place or organization. */
	events?: Event
	/** The fax number. */
	faxNumber?: Text
	/** A person or organization who founded this organization. */
	founder?: Person | Organization
	/** A person who founded this organization. */
	founders?: Person
	/** The date that this organization was founded. */
	foundingDate?: Date
	/** The place where the Organization was founded. */
	foundingLocation?: Place
	/** A person or organization that supports (sponsors) something through some kind of financial contribution. */
	funder?: Organization | Person
	/** A [[Grant]] that directly or indirectly provide funding or sponsorship for this item. See also [[ownershipFundingInfo]]. */
	funding?: Grant
	/** The [Global Location Number](http://www.gs1.org/gln) (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
	globalLocationNumber?: Text
	/** Certification information about a product, organization, service, place, or person. */
	hasCertification?: Certification
	/** A credential awarded to the Person or Organization. */
	hasCredential?: EducationalOccupationalCredential
	/** The <a href="https://www.gs1.org/standards/gs1-digital-link">GS1 digital link</a> associated with the object. This URL should conform to the particular requirements of digital links. The link should only contain the Application Identifiers (AIs) that are relevant for the entity being annotated, for instance a [[Product]] or an [[Organization]], and for the correct granularity. In particular, for products:<ul><li>A Digital Link that contains a serial number (AI <code>21</code>) should only be present on instances of [[IndividualProduct]]</li><li>A Digital Link that contains a lot number (AI <code>10</code>) should be annotated as [[SomeProduct]] if only products from that lot are sold, or [[IndividualProduct]] if there is only a specific product.</li><li>A Digital Link that contains a global model number (AI <code>8013</code>)  should be attached to a [[Product]] or a [[ProductModel]].</li></ul> Other item types should be adapted similarly. */
	hasGS1DigitalLink?: URL
	/** MemberProgram offered by an Organization, for example an eCommerce merchant or an airline. */
	hasMemberProgram?: MemberProgram
	/** Specifies a MerchantReturnPolicy that may be applicable. */
	hasMerchantReturnPolicy?: MerchantReturnPolicy
	/** Indicates an OfferCatalog listing for this Organization, Person, or Service. */
	hasOfferCatalog?: OfferCatalog
	/** Points-of-Sales operated by the organization or person. */
	hasPOS?: Place
	/** Specification of a shipping service offered by the organization. */
	hasShippingService?: ShippingService
	/** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. The most specific child type of InteractionCounter should be used. */
	interactionStatistic?: InteractionCounter
	/** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
	isicV4?: Text
	/** An organization identifier as defined in [ISO 6523(-1)](https://en.wikipedia.org/wiki/ISO/IEC_6523). The identifier should be in the `XXXX:YYYYYY:ZZZ` or `XXXX:YYYYYY`format. Where `XXXX` is a 4 digit _ICD_ (International Code Designator), `YYYYYY` is an _OID_ (Organization Identifier) with all formatting characters (dots, dashes, spaces) removed with a maximal length of 35 characters, and `ZZZ` is an optional OPI (Organization Part Identifier) with a maximum length of 35 characters. The various components (ICD, OID, OPI) are joined with a colon character (ASCII `0x3a`). Note that many existing organization identifiers defined as attributes like [leiCode](https://schema.org/leiCode) (`0199`), [duns](https://schema.org/duns) (`0060`) or [GLN](https://schema.org/globalLocationNumber) (`0088`) can be expressed using ISO-6523. If possible, ISO-6523 codes should be preferred to populating [vatID](https://schema.org/vatID) or [taxID](https://schema.org/taxID), as ISO identifiers are less ambiguous. */
	iso6523Code?: Text
	/** Keywords or tags used to describe some item. Multiple textual entries in a keywords list are typically delimited by commas, or by repeating the property. */
	keywords?: URL | Text | DefinedTerm
	/** Of a [[Person]], and less typically of an [[Organization]], to indicate a topic that is known about - suggesting possible expertise but not implying it. We do not distinguish skill levels here, or relate this to educational content, events, objectives or [[JobPosting]] descriptions. */
	knowsAbout?: URL | Text | Thing
	/** Of a [[Person]], and less typically of an [[Organization]], to indicate a known language. We do not distinguish skill levels or reading/writing/speaking/signing here. Use language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). */
	knowsLanguage?: Text | Language
	/** The legal address of an organization which acts as the officially registered address used for legal and tax purposes. The legal address can be different from the place of operations of a business and other addresses can be part of an organization. */
	legalAddress?: PostalAddress
	/** The official name of the organization, e.g. the registered company name. */
	legalName?: Text
	/** One or multiple persons who represent this organization legally such as CEO or sole administrator. */
	legalRepresentative?: Person
	/** An organization identifier that uniquely identifies a legal entity as defined in ISO 17442. */
	leiCode?: Text
	/** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
	location?: VirtualLocation | PostalAddress | Place | Text
	/** An associated logo. */
	logo?: URL | ImageObject
	/** A pointer to products or services offered by the organization or person. */
	makesOffer?: Offer
	/** A member of an Organization or a ProgramMembership. Organizations can be members of organizations; ProgramMembership is typically for individuals. */
	member?: Organization | Person
	/** An Organization (or ProgramMembership) to which this Person or Organization belongs. */
	memberOf?: ProgramMembership | MemberProgramTier | Organization
	/** A member of this organization. */
	members?: Organization | Person
	/** The North American Industry Classification System (NAICS) code for a particular organization or business person. */
	naics?: Text
	/** nonprofitStatus indicates the legal status of a non-profit organization in its primary place of business. */
	nonprofitStatus?: NonprofitType
	/** The number of employees in an organization, e.g. business. */
	numberOfEmployees?: QuantitativeValue
	/** For an [[Organization]] (often but not necessarily a [[NewsMediaOrganization]]), a description of organizational ownership structure; funding and grants. In a news/media setting, this is with particular reference to editorial independence.   Note that the [[funder]] is also available and can be used to make basic funder information machine-readable. */
	ownershipFundingInfo?: AboutPage | CreativeWork | Text | URL
	/** Products owned by the organization or person. */
	owns?: Product | OwnershipInfo
	/** The larger organization that this organization is a [[subOrganization]] of, if any. */
	parentOrganization?: Organization
	/** The publishingPrinciples property indicates (typically via [[URL]]) a document describing the editorial principles of an [[Organization]] (or individual, e.g. a [[Person]] writing a blog) that relate to their activities as a publisher, e.g. ethics or diversity policies. When applied to a [[CreativeWork]] (e.g. [[NewsArticle]]) the principles are those of the party primarily responsible for the creation of the [[CreativeWork]].  While such policies are most typically expressed in natural language, sometimes related information (e.g. indicating a [[funder]]) can be expressed using schema.org terminology. */
	publishingPrinciples?: URL | CreativeWork
	/** A review of the item. */
	review?: Review
	/** Review of the item. */
	reviews?: Review
	/** A pointer to products or services sought by the organization or person (demand). */
	seeks?: Demand
	/** The geographic area where the service is provided. */
	serviceArea?: Place | AdministrativeArea | GeoShape
	/** A statement of knowledge, skill, ability, task or any other assertion expressing a competency that is either claimed by a person, an organization or desired or required to fulfill a role or to work in an occupation. */
	skills?: DefinedTerm | Text
	/** A slogan or motto associated with the item. */
	slogan?: Text
	/** A person or organization that supports a thing through a pledge, promise, or financial contribution. E.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
	sponsor?: Person | Organization
	/** A relationship between two organizations where the first includes the second, e.g., as a subsidiary. See also: the more specific 'department' property. */
	subOrganization?: Organization
	/** The Tax / Fiscal ID of the organization or person, e.g. the TIN in the US or the CIF/NIF in Spain. */
	taxID?: Text
	/** The telephone number. */
	telephone?: Text
	/** For an [[Organization]] (typically a [[NewsMediaOrganization]]), a statement about policy on use of unnamed sources and the decision process required. */
	unnamedSourcesPolicy?: CreativeWork | URL
	/** The Value-added Tax ID of the organization or person. */
	vatID?: Text
}
