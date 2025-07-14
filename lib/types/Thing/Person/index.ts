import { Language } from "../../bcp47/index.ts"
import { Date, Text, URL } from "../../DataType/index.ts"
import Certification from "../CreativeWork/Certification/index.ts"
import EducationalOccupationalCredential from "../CreativeWork/EducationalOccupationalCredential/index.ts"
import CreativeWork from "../CreativeWork/index.ts"
import Event from "../Event/index.ts"
import Thing from "../index.ts"
import Brand from "../Intangible/Brand/index.ts"
import DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import Demand from "../Intangible/Demand/index.ts"
import GenderType from "../Intangible/Enumeration/GenderType/index.ts"
import Grant from "../Intangible/Grant/index.ts"
import OfferCatalog from "../Intangible/ItemList/OfferCatalog/index.ts"
import MemberProgramTier from "../Intangible/MemberProgramTier/index.ts"
import Occupation from "../Intangible/Occupation/index.ts"
import Offer from "../Intangible/Offer/index.ts"
import ProgramMembership from "../Intangible/ProgramMembership/index.ts"
import Distance from "../Intangible/Quantity/Distance/index.ts"
import Mass from "../Intangible/Quantity/Mass/index.ts"
import ContactPoint from "../Intangible/StructuredValue/ContactPoint/index.ts"
import PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import StructuredValue from "../Intangible/StructuredValue/index.ts"
import InteractionCounter from "../Intangible/StructuredValue/InteractionCounter/index.ts"
import MonetaryAmount from "../Intangible/StructuredValue/MonetaryAmount/index.ts"
import OwnershipInfo from "../Intangible/StructuredValue/OwnershipInfo/index.ts"
import PriceSpecification from "../Intangible/StructuredValue/PriceSpecification/index.ts"
import QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import EducationalOrganization from "../Organization/EducationalOrganization/index.ts"
import Organization from "../Organization/index.ts"
import Country from "../Place/AdministrativeArea/Country/index.ts"
import Place from "../Place/index.ts"
import Product from "../Product/index.ts"

export default interface Person extends Thing {
	/** An additional name for a Person, can be used for a middle name. */
	additionalName?: Text
	/** Physical address of the item. */
	address?: Text | PostalAddress
	/** An organization that this person is affiliated with. For example, a school/university, a club, or a team. */
	affiliation?: Organization
	/** The number of completed interactions for this entity, in a particular role (the 'agent'), in a particular action (indicated in the statistic), and in a particular context (i.e. interactionService). */
	agentInteractionStatistic?: InteractionCounter
	/** An organization that the person is an alumni of. */
	alumniOf?: EducationalOrganization | Organization
	/** An award won by or for this item. */
	award?: Text
	/** Awards won by or for this item. */
	awards?: Text
	/** Date of birth. */
	birthDate?: Date
	/** The place where the person was born. */
	birthPlace?: Place
	/** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
	brand?: Brand | Organization
	/** A [callsign](https://en.wikipedia.org/wiki/Call_sign), as used in broadcasting and radio communications to identify people, radio and TV stations, or vehicles. */
	callSign?: Text
	/** A child of the person. */
	children?: Person
	/** A colleague of the person. */
	colleague?: Person | URL
	/** A colleague of the person. */
	colleagues?: Person
	/** A contact point for a person or organization. */
	contactPoint?: ContactPoint
	/** A contact point for a person or organization. */
	contactPoints?: ContactPoint
	/** Date of death. */
	deathDate?: Date
	/** The place where the person died. */
	deathPlace?: Place
	/** The Dun & Bradstreet DUNS number for identifying an organization or business person. */
	duns?: Text
	/** Email address. */
	email?: Text
	/** Family name. In the U.S., the last name of a Person. */
	familyName?: Text
	/** The fax number. */
	faxNumber?: Text
	/** The most generic uni-directional social relation. */
	follows?: Person
	/** A person or organization that supports (sponsors) something through some kind of financial contribution. */
	funder?: Organization | Person
	/** A [[Grant]] that directly or indirectly provide funding or sponsorship for this item. See also [[ownershipFundingInfo]]. */
	funding?: Grant
	/** Gender of something, typically a [[Person]], but possibly also fictional characters, animals, etc. While https://schema.org/Male and https://schema.org/Female may be used, text strings are also acceptable for people who are not a binary gender. The [[gender]] property can also be used in an extended sense to cover e.g. the gender of sports teams. As with the gender of individuals, we do not try to enumerate all possibilities. A mixed-gender [[SportsTeam]] can be indicated with a text value of "Mixed". */
	gender?: GenderType | Text
	/** Given name. In the U.S., the first name of a Person. */
	givenName?: Text
	/** The [Global Location Number](http://www.gs1.org/gln) (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
	globalLocationNumber?: Text
	/** Certification information about a product, organization, service, place, or person. */
	hasCertification?: Certification
	/** A credential awarded to the Person or Organization. */
	hasCredential?: EducationalOccupationalCredential
	/** The Person's occupation. For past professions, use Role for expressing dates. */
	hasOccupation?: Occupation
	/** Indicates an OfferCatalog listing for this Organization, Person, or Service. */
	hasOfferCatalog?: OfferCatalog
	/** Points-of-Sales operated by the organization or person. */
	hasPOS?: Place
	/** The height of the item. */
	height?: Distance | QuantitativeValue
	/** A contact location for a person's residence. */
	homeLocation?: ContactPoint | Place
	/** An honorific prefix preceding a Person's name such as Dr/Mrs/Mr. */
	honorificPrefix?: Text
	/** An honorific suffix following a Person's name such as M.D./PhD/MSCSW. */
	honorificSuffix?: Text
	/** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. The most specific child type of InteractionCounter should be used. */
	interactionStatistic?: InteractionCounter
	/** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
	isicV4?: Text
	/** The job title of the person (for example, Financial Manager). */
	jobTitle?: Text | DefinedTerm
	/** The most generic bi-directional social/work relation. */
	knows?: Person
	/** Of a [[Person]], and less typically of an [[Organization]], to indicate a topic that is known about - suggesting possible expertise but not implying it. We do not distinguish skill levels here, or relate this to educational content, events, objectives or [[JobPosting]] descriptions. */
	knowsAbout?: URL | Text | Thing
	/** Of a [[Person]], and less typically of an [[Organization]], to indicate a known language. We do not distinguish skill levels or reading/writing/speaking/signing here. Use language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). */
	knowsLanguage?: Text | Language
	/** A pointer to products or services offered by the organization or person. */
	makesOffer?: Offer
	/** An Organization (or ProgramMembership) to which this Person or Organization belongs. */
	memberOf?: ProgramMembership | MemberProgramTier | Organization
	/** The North American Industry Classification System (NAICS) code for a particular organization or business person. */
	naics?: Text
	/** Nationality of the person. */
	nationality?: Country
	/** The total financial value of the person as calculated by subtracting the total value of liabilities from the total value of assets. */
	netWorth?: PriceSpecification | MonetaryAmount
	/** Products owned by the organization or person. */
	owns?: Product | OwnershipInfo
	/** A parent of this person. */
	parent?: Person
	/** A parents of the person. */
	parents?: Person
	/** Event that this person is a performer or participant in. */
	performerIn?: Event
	/** A short string listing or describing pronouns for a person. Typically the person concerned is the best authority as pronouns are a critical part of personal identity and expression. Publishers and consumers of this information are reminded to treat this data responsibly, take country-specific laws related to gender expression into account, and be wary of out-of-date data and drawing unwarranted inferences about the person being described.  In English, formulations such as "they/them", "she/her", and "he/him" are commonly used online and can also be used here. We do not intend to enumerate all possible micro-syntaxes in all languages. More structured and well-defined external values for pronouns can be referenced using the [[StructuredValue]] or [[DefinedTerm]] values. */
	pronouns?: StructuredValue | Text | DefinedTerm
	/** The publishingPrinciples property indicates (typically via [[URL]]) a document describing the editorial principles of an [[Organization]] (or individual, e.g. a [[Person]] writing a blog) that relate to their activities as a publisher, e.g. ethics or diversity policies. When applied to a [[CreativeWork]] (e.g. [[NewsArticle]]) the principles are those of the party primarily responsible for the creation of the [[CreativeWork]].  While such policies are most typically expressed in natural language, sometimes related information (e.g. indicating a [[funder]]) can be expressed using schema.org terminology. */
	publishingPrinciples?: URL | CreativeWork
	/** The most generic familial relation. */
	relatedTo?: Person
	/** A pointer to products or services sought by the organization or person (demand). */
	seeks?: Demand
	/** A sibling of the person. */
	sibling?: Person
	/** A sibling of the person. */
	siblings?: Person
	/** A statement of knowledge, skill, ability, task or any other assertion expressing a competency that is either claimed by a person, an organization or desired or required to fulfill a role or to work in an occupation. */
	skills?: DefinedTerm | Text
	/** A person or organization that supports a thing through a pledge, promise, or financial contribution. E.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
	sponsor?: Person | Organization
	/** The person's spouse. */
	spouse?: Person
	/** The Tax / Fiscal ID of the organization or person, e.g. the TIN in the US or the CIF/NIF in Spain. */
	taxID?: Text
	/** The telephone number. */
	telephone?: Text
	/** The Value-added Tax ID of the organization or person. */
	vatID?: Text
	/** The weight of the product or person. */
	weight?: Mass | QuantitativeValue
	/** A contact location for a person's place of work. */
	workLocation?: ContactPoint | Place
	/** Organizations that the person works for. */
	worksFor?: Organization
}
